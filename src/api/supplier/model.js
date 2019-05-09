'use strict'
module.exports = (sequelize, DataTypes) => {
    var Supplier = sequelize.define('Supplier', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactid: DataTypes.INTEGER,
        // createdAt: DataTypes.DATE,
        // updatedAt: DataTypes.DATE,
    })

    // Supplier.associate = function (models) {
    //     models.Supplier.belongsTo(models.User, {
    //         as: 'createdBy' //link createdBy voi primary key cua bang User (ID)
    //     });
    // };
    
    return Supplier
}