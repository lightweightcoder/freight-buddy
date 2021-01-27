export default function initCountryModel(sequelize, DataTypes) {
  return sequelize.define('country', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    timestamps: false,
  });
}
