'use strict'
module.exports = (sequelize, DataTypes) => {
    var Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: DataTypes.INTEGER,
        cover: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        categoty: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    })

    Product.associate = function (models) {
        models.Product.belongsTo(models.User, {
            as: 'createdBy'
        });
    };
    
    return Product
}