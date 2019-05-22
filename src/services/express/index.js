import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { env } from '../../config'
import path from 'path'
import { errorHandler } from 'bodymen';

export default (apiRoot, routers) => {
  const app = express()
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }
  app.use(bodyParser.urlencoded({ extended: false })) //Bien 1 chuoi post thanh json
  app.use(bodyParser.json())
  app.use(apiRoot, routers) //Import rooter
  app.use(express.static(path.join(__dirname, '../../../www')))
  app.use(express.static(path.join(__dirname, '../../../apidoc')))
  app.use('/images', express.static(path.join(__dirname, '../../../images')))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../apidoc/index.html'))
  })
  app.use(errorHandler())
  return app
}
