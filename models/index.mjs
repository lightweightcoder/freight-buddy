import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

// import functions to initialise models
import initCountryModel from './country.mjs';
import initCategoryModel from './category.mjs';
import initUserModel from './user.mjs';
import initRequestModel from './request.mjs';
import initProductPhotoModel from './productPhoto.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// initalise models and store as methods in db object
db.Country = initCountryModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Request = initRequestModel(sequelize, Sequelize.DataTypes);
db.ProductPhoto = initProductPhotoModel(sequelize, Sequelize.DataTypes);

// create the associations between models
db.Country.hasMany(db.Request);
db.Request.belongsTo(db.Country);

db.Country.hasMany(db.User);
db.User.belongsTo(db.Country);

db.Category.hasMany(db.Request);
db.Request.belongsTo(db.Category);

db.User.hasMany(db.Request, { as: 'requester', foreignKey: 'requesterId' });
// mentioning as will allow sequelize to create getter and setter mtds (eg. getRequester)
// and create a requesterId column in the requests table if not already created in the model
db.Request.belongsTo(db.User, { as: 'requester' });

db.User.hasMany(db.Request, { as: 'helper', foreignKey: 'helperId' });
// mentioning this will allow sequelize to create getter and setter mtds (eg. getHelper)
// and create a helperId column in the requests table if not already created in the model
db.Request.belongsTo(db.User, { as: 'helper' });

db.Request.hasMany(db.ProductPhoto);
db.ProductPhoto.belongsTo(db.Request);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
