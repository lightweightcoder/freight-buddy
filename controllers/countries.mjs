export default function countries(db) {
  const index = async (req, res) => {
    console.log('request to render list of countries');

    // set object to store data to be sent to response
    const data = {};

    try {
      const countriesList = await db.Country.findAll();

      data.countriesList = countriesList;
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return { index };
}
