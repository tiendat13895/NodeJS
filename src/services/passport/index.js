//middle ware
import passport from 'passport'
import { BasicStrategy } from 'passport-http'
// import User from './../../api/user/model'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import db from './../sequelize'

import bcrypt from 'bcrypt'

const User = db.User

// const masterKey = 'god'

//check username && password
export const password = () => (req, res, next) =>
    passport.authenticate('password', {
        session: false
    }, (err, user, info) => {
        if (err && err.param) {
            return res.status(400).json(err)
        } else if (err || !user) {
            return res.status(401).end()
        }
        req.logIn(user, {
            session: false
        }, err => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next)


//check master token
export const master = () =>
    passport.authenticate('master', {
        session: false
    })

//verify token provided to user
export const token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
    passport.authenticate('token', {
        session: false
    }, (err, user, info) => {
        if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
            return res.status(401).end()
        }
        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next)



passport.use('password', new BasicStrategy((username, password, done) => {
    const hash = bcrypt.hashSync(password, 9)
    User.findOne({ where: { username: username, password: hash } }).then(user => {
        if (!user) {
            done(true)
        } else {
            done(null, user)
        }
    }).catch(err => {
        done(err)
    })
}))

passport.use('master', new BearerStrategy((token, done) => {
    if (token === masterKey) {
        done(null, {})
    } else {
        done(null, false)
    }
}))

passport.use('token', new JwtStrategy({
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromHeader('access_token')
    ])
}, ({ id }, done) => {
    User.findByPk(id).then(user => {
        if (!user) {
            done(true)
        } else {
            done(null, user)
        }
    })
}))