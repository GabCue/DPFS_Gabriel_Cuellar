module.exports = (sequelize, DataTypes) => {
    const ProductType = sequelize.define('ProductType', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    });
  
    
    ProductType.associate = (models) => {
      
      ProductType.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'product_type_id',
      });
    };
  
    return ProductType;
  };
  