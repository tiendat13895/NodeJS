import jwt from 'jsonwebtoken' //ki vao data, verify token
import Promise from 'bluebird'
import { jwtSecret } from '../../config'

// const privateKey = 'janeto'
const jwtSign = Promise.promisify(jwt.sign) //????
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (id, options, method = jwtSign) =>
    method({ id }, jwtSecret, options)

    export const verify = (token) => jwtVerify(token, jwtSecret)