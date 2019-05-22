import { Router } from 'express'
import { sign } from './../../services/jwt'
import { password } from '../../services/passport'
import { login, register, forgotPassword } from './controller'
import multer from 'multer'
import path from 'path'

const router = new Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({ storage: storage })

// router.post('/login', password(), login)
router.put('/login', password(), login)
router.post('/register', upload.single('avatar'), register) //ten field upload file single: co file la dua vao avatar
router.post('/forgot', forgotPassword)

export default router