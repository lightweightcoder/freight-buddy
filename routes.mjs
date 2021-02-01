import { resolve } from 'path';
import db from './models/index.mjs';

// import checkAuth middleware
import checkAuthMiddleware from './utilities/check-auth.mjs';

// import controllers
import users from './controllers/users.mjs';
import requests from './controllers/requests.mjs';

export default function routes(app) {
  // pass in db for all callbacks in controllers
  const checkAuth = checkAuthMiddleware(db);
  const UsersController = users(db);
  const RequestsController = requests(db);

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
}
