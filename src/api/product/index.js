import { Router } from 'express'
import { create, index, update, show, remove } from './controller'


const router = new Router()
router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router