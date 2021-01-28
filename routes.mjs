import { resolve } from 'path';
import db from './models/index.mjs';

// import controllers
import users from './controllers/users.mjs';

export default function routes(app) {
  // pass in db for all callbacks in controllers
  const UsersController = users(db);

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
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
}
