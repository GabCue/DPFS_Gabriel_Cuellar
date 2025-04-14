module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });


  Category.associate = (models) => {

    Category.belongsToMany(models.Product, {
      through: 'ProductCategory',
      as: 'products',
      foreignKey: 'categoryId',
      otherKey: 'productId',
    });
  };

  return Category;
};
