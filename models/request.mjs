export default function initRequestModel(sequelize, DataTypes) {
  return sequelize.define('request', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    countryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'countries',
        key: 'id',
      },
    },
    helperId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    requesterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    productName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    referenceLink: {
      type: DataTypes.STRING,
    },
    payment_filename: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('requested', 'accepted', 'shipped', 'completed', 'cancelled'),
    },
    shippingAddress: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
