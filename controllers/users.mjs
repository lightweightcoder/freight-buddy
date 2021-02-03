import pkg from 'sequelize';
import getHash from '../utilities/get-hash.mjs';

const { UniqueConstraintError, ValidationError, DatabaseError } = pkg;

export default function users(db) {
  const login = async (req, res) => {
    console.log('post request to login came in');

    // set object to store messages for invalid email or password input fields
    const templateData = {};

    try {
      const emailInput = req.body.email;
      const passwordInput = req.body.password;
      const hashedPasswordInput = getHash(passwordInput);

      // try to find a user
      const user = await db.User.findOne(
        {
          where: { email: emailInput, password: hashedPasswordInput },
        },
      );

      // check if a user is found
      if (user === null) {
        console.log('user not found');

        // add message to inform user of invalid email/password
        templateData.invalidMessage = 'Sorry you have keyed in an incorrect email/password';

        // render the login form
        res.render('login', templateData);
      } else {
        console.log('found user, logged in!');

        // generate a hashed userId
        const loggedInHash = getHash(user.id);

        // set cookies with the userId and hashed userId
        res.cookie('userId', user.id);
        res.cookie('loggedInHash', loggedInHash);

        // redirect to home page
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const getRegistrationPage = async (req, res) => {
    console.log('render a registration page');

    // set object to store array of countries data from the database
    const templateData = {};

    try {
      // find array of countries data
      const countries = await db.Country.findAll();

      templateData.countries = countries;

      // render the registration page
      res.render('register', templateData);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const register = async (req, res) => {
    console.log('post request to register came in!');

    try {
      const {
        email, password, name, about, countryId, address, bankName, bankAccountNumber,
      } = req.body;
      const hashedPassword = getHash(password);

      // try to create a user
      const user = await db.User.create({
        email,
        password: hashedPassword,
        name,
        about,
        countryId,
        address,
        bankName,
        bankAccountNumber,
      });

      // generate a hashed userId
      const loggedInHash = getHash(user.id);

      // set cookies with the userId and hashed userId
      res.cookie('userId', user.id);
      res.cookie('loggedInHash', loggedInHash);

      // redirect to home route
      res.redirect('/');
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        // email is not unique
        console.log('SORRY UNIQUE ERROR');
        console.log(error);

        const invalidMsg = 'The email you entered already exists.';

        try {
          // find array of countries data
          const countries = await db.Country.findAll();

          res.render('register', { invalidMsg, countries });
        } catch (findCountriesError) {
          console.log(findCountriesError);
          // send error to browser
          res.status(500).send(findCountriesError);
        }
      } else if (error instanceof ValidationError) {
        console.log('SORRY VALIDATION ERROR');
        console.log(error);
        console.log('THIS IS WHAT HAPPENED:');
        console.log(error.errors[0].message);
        res.status(500).send(error);
      } else if (error instanceof DatabaseError) {
        console.log('SORRY DB ERROR');
        console.log(error);
        res.status(500).send(error);
      }
      else {
        console.log(error);
        res.status(500).send(error);
      }
    }
  };

  const requests = async (req, res) => {
    console.log('get request for user delivery requests came in');

    // set object to store data to be sent to response
    const data = {};

    // store the user's data (or null if no user is logged in) gotten from the
    // previous middleware, checkAuth
    const { user } = req;

    try {
      // object containing requests, where each key is the status of the delivery request
      // and value is an array of requests corresponding to that status
      const requestsObject = {
        requested: [],
        accepted: [],
        shipped: [],
        completed: [],
        cancelled: [],
      };

      // find all requests belonging to that user
      const requestsList = await db.Request.findAll({
        where: {
          requesterId: user.id,
        },
        include: [
          db.Country,
          db.ProductPhoto,
          { model: db.User, as: 'requester' },
          { model: db.User, as: 'helper' },
          db.Category,
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      // store the requests in the requests object depending on the status of the request
      for (let i = 0; i < requestsList.length; i += 1) {
        const { status } = requestsList[i];
        if (status === 'requested') {
          requestsObject.requested.push(requestsList[i]);
        } else if (status === 'accepted') {
          requestsObject.accepted.push(requestsList[i]);
        } else if (status === 'shipped') {
          requestsObject.shipped.push(requestsList[i]);
        } else if (status === 'completed') {
          requestsObject.completed.push(requestsList[i]);
        } else if (status === 'cancelled') {
          requestsObject.cancelled.push(requestsList[i]);
        }
      }

      data.requestsObject = requestsObject;
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const favours = async (req, res) => {
    console.log('get request for user favours came in');

    // set object to store data to be sent to response
    const data = {};

    // store the user's data (or null if no user is logged in) gotten from the
    // previous middleware, checkAuth
    const { user } = req;

    try {
      // object containing favours, where each key is the status of the favour
      // and value is an array of favours corresponding to that status
      const favoursObject = {
        requested: [],
        accepted: [],
        shipped: [],
        completed: [],
        cancelled: [],
      };

      // find all requests belonging to that user
      const favoursList = await db.Request.findAll({
        where: {
          helperId: user.id,
        },
        include: [
          db.Country,
          db.ProductPhoto,
          { model: db.User, as: 'requester' },
          { model: db.User, as: 'helper' },
          db.Category,
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      // store the requests in the requests object depending on the status of the request
      for (let i = 0; i < favoursList.length; i += 1) {
        const { status } = favoursList[i];
        if (status === 'requested') {
          favoursObject.requested.push(favoursList[i]);
        } else if (status === 'accepted') {
          favoursObject.accepted.push(favoursList[i]);
        } else if (status === 'shipped') {
          favoursObject.shipped.push(favoursList[i]);
        } else if (status === 'completed') {
          favoursObject.completed.push(favoursList[i]);
        } else if (status === 'cancelled') {
          favoursObject.cancelled.push(favoursList[i]);
        }
      }

      data.favoursObject = favoursObject;
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return {
    login, getRegistrationPage, register, requests, favours,
  };
}
