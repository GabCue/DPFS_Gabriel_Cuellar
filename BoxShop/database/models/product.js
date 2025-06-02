module.exports = (sequelize, DataTypes) => {
  const alias = 'Product';

  const cols = {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    product_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const config = {
    tableName: 'products',
    paranoid: true,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (models) => {
    Product.belongsTo(models.ProductType, {
      as: 'productType',
      foreignKey: 'product_type_id',
    });

  
    Product.belongsToMany(models.Category, {
      through: 'ProductCategory',
      as: 'categories',
      foreignKey: 'productId',
      otherKey: 'categoryId',
    });
  };

  return Product;
};
