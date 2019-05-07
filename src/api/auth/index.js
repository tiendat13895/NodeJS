import { Router } from 'express'
import { sign } from './../../services/jwt'
import { password } from '../../services/passport'
import { login, register, forgotPassword } from './controller'

const router = new Router()

router.post('/login', password(), login)
router.post('/register', register)
router.post('/forgot', forgotPassword)

export default router