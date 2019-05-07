import db from './../../services/sequelize'
const User = db.User

export const create = (req, res, next) => {
    const body = req.body
    User.create(body).then((data) => {
        res.send(data)
    }).catch(err => {
        res.status(404).send(err)
    })
    // // if (!body.password) {
    // //     return res.status(404).send()
    // // }
    // // if (body.password.length < 8) {
    // //     return res.status(404).send()
    // // }
    // res.send(body)
    // // res.send('POST USER')
}

export const query = (req, res, next) => {
    const q = req.query //get query
    res.send(q)
}