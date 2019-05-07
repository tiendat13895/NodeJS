import path from 'path'
import merge from 'lodash/merge'

const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`)
  }
  return process.env[name]
}

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.default')
  })
}

const config = {
  all: { //Hoac co the add trong .env hoac .enc.default
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 3000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '', //lay /api trong .env 
    jwtSecret: process.env.JWTSECRET || '',
    masterKey: process.env.MASTERKEY || '',
  },
  development: {
    mssql: {
      database: 'DC_ERP_test',
      username: 'sa',
      password: 'pohhuat2vietnam',
      host: '128.128.40.4',
      // server: 'netserver'
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mssql: {
      database: process.env.DATABASE || 'dc_erp',
      username: process.env.DBUSERNAME || 'root',
      password: process.env.DBPASSWORD || null,
      host: process.env.DBHOSTNAME || 'localhost'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports