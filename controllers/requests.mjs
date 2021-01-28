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
        include: db.Country,
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

  return { index };
}
