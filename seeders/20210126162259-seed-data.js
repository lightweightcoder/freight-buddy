// import seed data
const seedData = require('../utilities/seed-data');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      countriesList, categoriesList, usersList, requestsList, productPhotosList,
    } = seedData;

    try {
      await queryInterface.bulkInsert('countries', countriesList);
      await queryInterface.bulkInsert('categories', categoriesList);
      await queryInterface.bulkInsert('users', usersList);
      await queryInterface.bulkInsert('requests', requestsList);
      await queryInterface.bulkInsert('product_photos', productPhotosList);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('countries', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('requests', null, {});
    await queryInterface.bulkDelete('product_photos', null, {});
  },
};
