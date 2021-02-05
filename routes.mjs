import { resolve } from 'path';
import multer from 'multer';
import { EDESTADDRREQ } from 'constants';
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

  // multer settings ------------------------
  // set the name of the upload directory and filename of uploaded photos here for multer
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/images/products');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    },
  });

  // using the configuration in the storage varible, generate a middleware to process
  // multiple files sharing the same field name of 'file'
  // the `Request` object will be populated with a `files` array containing
  // an information object for each processed file.
  const multerUpload = multer({ storage }).array('productPhotos');

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

  // upload photos into /public/images/products folder and creates a new request
  app.post('/requests', checkAuth, (req, res, next) => {
    multerUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).send(err);
      } if (err) {
        return res.status(500).send(err);
      }

      // store the files in the request object as productPhotosFiles
      req.productPhotosFiles = req.files;
      // no error
      next();
    });
  },
  RequestsController.create);
}
