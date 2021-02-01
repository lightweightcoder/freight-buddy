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

      // perform the DB update depending on the request's new status
      if (newStatus === 'accepted') {
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
      }

      const updatedRequest = await db.Request.findOne({
        where: {
          id: requestId,
        },
        include: [
          db.Country,
          db.ProductPhoto,
          { model: db.User, as: 'requester' },
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

  return { index, show, updateStatus };
}
