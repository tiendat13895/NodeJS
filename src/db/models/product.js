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
        // createdAt: DataTypes.DATE,
        // updatedAt: DataTypes.DATE,
        //in sequelize/lib/data-types.js change 
        //return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
        //  ->  return date.format('YYYY-MM-DD HH:mm:ss');
    },
        {
            createdAt: false,
            updatedAt: false
        })

    Product.associate = function (models) {
        models.Product.belongsTo(models.User, {
            as: 'createdBy' //link createdBy voi primary key cua bang User (ID)
        });
    };

    return Product
}