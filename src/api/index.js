import { Router } from 'express'
import user from './user'
import auth from './auth'
import product from './product'

const router = new Router()

router.use('/users', user)
router.use('/auth', auth)
router.use('/products', product)

export default router