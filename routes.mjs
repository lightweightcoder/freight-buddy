import { resolve } from 'path';
import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import db from './models/index.mjs';

// import checkAuth middleware
import checkAuthMiddleware from './utilities/check-auth.mjs';

// import controllers
import users from './controllers/users.mjs';
import requests from './controllers/requests.mjs';
import countries from './controllers/countries.mjs';
import categories from './controllers/categories.mjs';

export default function routes(app) {
  // pass in db for all callbacks in controllers
  const checkAuth = checkAuthMiddleware(db);
  const UsersController = users(db);
  const RequestsController = requests(db);
  const CountriesController = countries(db);
  const CategoriesController = categories(db);

  // multer settings for local deployment ------------------------
  // set the name of the upload directory and filename of uploaded photos here for multer
  // const storage = multer.diskStorage({
  //   destination(req, file, cb) {
  //     cb(null, 'public/images/request-photos');
  //   },
  //   filename(req, file, cb) {
  //     cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
  //   },
  // });

  // // using the configuration in the storage varible, generate a middleware to process
  // // multiple files for the field names 'payment' and 'product photos'
  // // to upload images of a request's payment details and product photos respectively
  // // the `Request` object will be populated with a `files` object which
  // // maps each field name to an array of the associated file information objects.
  // const multerRequestPhotosUpload = multer({ storage })
  //   .fields([
  //     {
  //       name: 'productPhotos',
  //     },
  //     {
  //       name: 'payment',
  //     },
  //   ]);

  // multer settings for heroku deployment ------------------------
  // configure the aws-sdk and multerS3 libraries
  const s3 = new aws.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  });

  // set the name of the upload directory here for multer for heroku deployment
  // and generate a middleware to process multiple files
  const multerRequestPhotosUpload = multer({
    storage: multerS3({
      s3,
      bucket: 'aljt-heroku',
      acl: 'public-read',
      metadata: (request, file, callback) => {
        callback(null, { fieldName: file.fieldname });
      },
      key: (request, file, callback) => {
        callback(null, Date.now().toString());
      },
    }),
  }).fields([
    {
      name: 'productPhotos',
    },
    {
      name: 'payment',
    },
  ]);

  // special JS page. Include the webpack index.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // login page
  app.get('/login', (req, res) => {
    console.log('render a login page');

    res.render('login');
  });

  // accept login form request
  app.post('/login', UsersController.login);

  // registration page
  app.get('/register', UsersController.getRegistrationPage);

  // register a user
  app.post('/register', UsersController.register);

  // get a list of available requests
  app.get('/requests', checkAuth, RequestsController.index);

  // get a request's details
  app.get('/requests/:id', checkAuth, RequestsController.show);

  // update a request's status
  app.put('/requests/:id/status', checkAuth, RequestsController.updateStatus);

  // get a list of countries
  app.get('/countries', CountriesController.index);

  // get a list of categories
  app.get('/categories', CategoriesController.index);

  // get a list of requests made by the user
  app.get('/users/requests', checkAuth, UsersController.requests);

  // get a list of favours for a user
  app.get('/users/favours', checkAuth, UsersController.favours);

  // logout a user
  app.delete('/logout', UsersController.logout);

  // upload photos into /public/images/request-photos folder and creates a new request
  app.post('/requests', checkAuth,
    (req, res, next) => {
      console.log('going to do uploads');
      multerRequestPhotosUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).send(err);
        } if (err) {
          return res.status(500).send(err);
        }
        console.log('no error uploading photos');
        // store the files in the request object as productPhotosFiles
        req.productPhotosFiles = req.files.productPhotos;
        // eslint-disable-next-line prefer-destructuring
        req.paymentFile = req.files.payment[0];
        // no error
        next();
      });
    },
    RequestsController.create);

  // accept a request to login to a demo user
  app.get('/demo-login', UsersController.demoLogin);
}
