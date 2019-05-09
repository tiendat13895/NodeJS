import { Router } from 'express'
import user from './user'
import auth from './auth'
import product from './product'
import supplier from './supplier'

const router = new Router()

router.use('/auth', auth)
router.use('/users', user)
router.use('/products', product)
router.use('/suppliers', supplier)

export default router