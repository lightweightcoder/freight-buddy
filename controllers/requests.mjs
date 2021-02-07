export default function requests(db) {
  const index = async (req, res) => {
    console.log('request to render list of requests');

    // set object to store data to be sent to response
    const data = {};

    // store the user's data (or null if no user is logged in) gotten from the
    // previous middleware, checkAuth
    const { user } = req;

    // array of available requests
    let requestsList;

    try {
      // if user is logged in, find available requests in the user's country,
      // else find all requests
      if (user !== null) {
        requestsList = await db.Request.findAll({
          where: {
            status: 'requested',
            countryId: user.countryId,
          },
          include: [
            db.Country,
            db.ProductPhoto,
          ],
          order: [
            ['createdAt', 'DESC'],
          ],
        });
      } else {
        requestsList = await db.Request.findAll({
          where: {
            status: 'requested',
          },
          include: [
            db.Country,
            db.ProductPhoto,
          ],
          order: [
            ['createdAt', 'DESC'],
          ],
        });
      }

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
          db.Category,

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
      } else if (newStatus === 'cancelled') {
        // this means that a requester clicked on the cancel request button
        // remove the helper id from the DB and change status to cancelled
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
      } else if (newStatus === 'completed') {
        // if new status is completed, update status
        await db.Request.update(
          {
            status: newStatus,
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
          db.Category,
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

      // get the delivery request from request body.
      // this will contain details to create a request in the DB
      const request = req.body;
      // add the payment filename to the delivery request details
      // request.paymentFilename = `/images/request-photos/${req.paymentFile.filename}`;
      // add the payment filename to the delivery request details (for aws-s3)
      request.paymentFilename = req.paymentFile.location;

      // if there is no logged in user, send a 403 request forbidden response
      if (user === null) {
        console.log('inside forbidden response');
        res.sendStatus(403);
        // return so code below will not run
        return;
      }

      const newRequest = await db.Request.create(request);

      // get the request's product photos uploaded by multer
      const { productPhotosFiles } = req;
      // array to store information to be saved in the productPhotos DB table
      const productPhotosData = [];
      for (let i = 0; i < productPhotosFiles.length; i += 1) {
        productPhotosData.push({
          requestId: newRequest.id,
          // for local storage
          // filename: `/images/request-photos/${productPhotosFiles[i].filename}`,
          // for aws-s3 storage
          filename: productPhotosFiles[i].location,
        });
      }
      // array to store the returned model instances after inserting the productPhotos into the DB
      const productPhotosInstances = [];
      // insert the productPhotos into the DB
      for (let i = 0; i < productPhotosData.length; i += 1) {
        productPhotosInstances.push(db.ProductPhoto.create(productPhotosData[i]));
      }
      // wait for all the productPhotos to be uploaded into the DB
      await Promise.all(productPhotosInstances);

      const createdRequest = await db.Request.findOne({
        where: {
          id: newRequest.id,
        },
        include: [
          db.Country,
          db.ProductPhoto,
          { model: db.User, as: 'requester' },
          { model: db.User, as: 'helper' },
          db.Category,
        ],
      });

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
