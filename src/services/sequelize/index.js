import Sequelize from 'sequelize'
import { mssql } from './../../config'

const sequelize = new Sequelize(mssql.database, mssql.username, mssql.password,
    {
        dialect: 'mssql',
        host: mssql.host
    })

var userModel = sequelize['import']('../../api/user/model');
var productModel = sequelize['import']('../../api/product/model');

const db = {
    User: userModel,
    Product: productModel
}

db.sequelize = sequelize; //object
db.Sequelize = Sequelize; //class

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    })

module.exports = db;