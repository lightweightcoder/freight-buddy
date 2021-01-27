export default function initCategoryModel(sequelize, DataTypes) {
  return sequelize.define('category', {
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
