module.exports = (sequelize, DataTypes) => {
    const products_image = sequelize.define('products_image', {
      url: DataTypes.STRING
    }, {});
  
    products_image.associate = function(models){
      // Assocations define here
      products_image.belongsTo(models.products, {
        foreignKey: 'products_id'
      })
    }
  
    return products_image
  }