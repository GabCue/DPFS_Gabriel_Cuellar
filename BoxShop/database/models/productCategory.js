module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products', 
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories', 
        key: 'id',
      },
    },
  });


  ProductCategory.associate = (models) => {
  
    ProductCategory.belongsTo(models.Product, {
      foreignKey: 'productId',
    });

    ProductCategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
  };

  return ProductCategory;
};
