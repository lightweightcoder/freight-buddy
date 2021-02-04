import { resolve } from 'path';
import multer from 'multer';
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
  // set the name of the upload directory here for multer
  const multerUpload = multer({ dest: 'uploads/product-photos' });

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

  // accept request to create a request
  // app.post('/requests', checkAuth, multerUpload.single('photo'));
  app.post('/requests', checkAuth, RequestsController.create);

  // get a list of requests made by the user
  app.get('/users/requests', checkAuth, UsersController.requests);

  // get a list of favours for a user
  app.get('/users/favours', checkAuth, UsersController.favours);

  // logout a user
  app.delete('/logout', UsersController.logout);
}
