// const users = [
//     {
//         id: 1,
//         username: 'admin',
//         password: 'admin',
//         role: 'admin'
//     },
//     {
//         id: 2,
//         username: 'user',
//         password: 'user',
//         role: 'user'
//     }
// ]

// export default users;

'use strict'
import bcrypt from 'bcrypt'
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            set: function (val) {
                if (!val) {
                    return
                }
                const hash = bcrypt.hashSync(val, 9)
                this.setDataValue('password', hash)
            }
        },
        // fullname: DataTypes.STRING,
        role: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        // createdAt: null,
        // updatedAt: null
    })

    // User.associate = function (models) {
    //     models.User.hasMany(models.Product, {
    //         as: 'products',
    //     });
    // };

    return User
}