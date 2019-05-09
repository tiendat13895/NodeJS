import db from './../../services/sequelize'
const User = db.User
import { sign } from './../../services/jwt'

export const login = (req, res, next) => {
    const user = req.user
    sign(user.id).then(token => { //ki ra kieu base 64
        res.status(200).json(token)
    }).catch(err => {
        res.status(401).json(err)
    })
}

export const register = (req, res, next) => {
    const body = req.body
    User.create(body).then((data) => {
        res.send(data)
    }).catch(err => {
        res.status(404).send(err)
    })
}

export const forgotPassword = (req, res, next) => {

}