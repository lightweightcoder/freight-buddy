import { resolve } from 'path';
import db from './models/index.mjs';

export default function routes(app) {
  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // login page
  app.get('/login', (req, res) => {
    console.log('render a login page');

    res.render('login');
  });
}
