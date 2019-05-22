import db from './../../services/sequelize'

const User = db.User

export const create = (req, res, next) => {
    const body = req.body
    User.create(body).then((data) => {
        res.send(data)
    }).catch(err => {
        res.status(404).send(err)
    })

}

export const query = (req, res, next) => {
    const q = req.query //get query
    res.send(q)
}