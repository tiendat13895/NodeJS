import Sequelize from 'sequelize'
import { mssql } from './../../config'

const sequelize = new Sequelize(mssql.database, mssql.username, mssql.password,
    {
        dialect: 'mssql',
        host: mssql.host
    })

var userModel = sequelize['import']('../../api/user/model');
var productModel = sequelize['import']('../../api/product/model');
var supplierModel = sequelize['import']('../../api/supplier/model');

const db = {
    User: userModel,
    Product: productModel,
    Supplier: supplierModel
}

Object.keys(db).forEach(modelName => { //join to connect 2 table
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

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