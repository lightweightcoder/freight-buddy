export default function requests(db) {
  const index = async (req, res) => {
    console.log('request to render list of requests');

    // set object to store data to be sent to response
    const data = {};

    try {
      // store the user's data (or null if no user is logged in) gotten from the
      // previous middleware, checkAuth
      const { user } = req;

      const requestsList = await db.Request.findAll({
        where: {
          status: 'requested',
        },
        include: [
          db.Country,
          db.ProductPhoto,
        ],
      });

      data.requestsList = requestsList;
      data.user = user;
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const show = async (req, res) => {
    console.log('request to render a request');

    // set object to store data to be sent to response
    const data = {};

    try {
      const request = await db.Request.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          db.Country,
          db.ProductPhoto,
          { model: db.User, as: 'requester' },
          { model: db.User, as: 'helper' },
        ],
      });

      data.request = request;
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const updateStatus = async (req, res) => {
    console.log('request to update the status of a request ');

    // set object to store data to be sent to response
    const data = {};

    try {
      // store the user's data (or null if no user is logged in) gotten from the
      // previous middleware, checkAuth
      const { user } = req;

      // request id
      const requestId = req.params.id;

      // new status to be updated to
      const { newStatus } = req.body;

      // if there is no logged in user, send a 403 request forbidden response
      if (user === null) {
        console.log('inside forbidden response');
        res.sendStatus(403);
        // return so code below will not run
        return;
      }

      // perform the DB update depending on the request's new status
      if (newStatus === 'accepted' || newStatus === 'shipped') {
        // if new status is accepted, update status and the user id of the helper
        await db.Request.update(
          {
            status: newStatus,
            helperId: user.id,
          },
          {
            where: {
              id: requestId,
            },
          },
        );
      } else if (newStatus === 'requested') {
        // this means that a helper clicked on the withdraw help button
        // remove the helper id from the DB and change status to requested
        await db.Request.update(
          {
            status: newStatus,
            helperId: null,
          },
          {
            where: {
              id: requestId,
            },
          },
        );
      }

      const updatedRequest = await db.Request.findOne({
        where: {
          id: requestId,
        },
        include: [
          db.Country,
          db.ProductPhoto,
          { model: db.User, as: 'requester' },
          { model: db.User, as: 'helper' },
        ],
      });

      data.updatedRequest = updatedRequest;

      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const create = async (req, res) => {
    console.log('request to create a delivery request');

    // set object to store data to be sent to response
    const data = {};

    try {
      // store the user's data (or null if no user is logged in) gotten from the
      // previous middleware, checkAuth
      const { user } = req;

      // get the delivery request to be created from request body
      const request = req.body;

      // if there is no logged in user, send a 403 request forbidden response
      if (user === null) {
        console.log('inside forbidden response');
        res.sendStatus(403);
        // return so code below will not run
        return;
      }

      const createdRequest = await db.Request.create(request);

      data.createdRequest = createdRequest;
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return {
    index, show, updateStatus, create,
  };
}
