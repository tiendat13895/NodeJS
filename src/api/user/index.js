import { Router } from 'express'
import { master, token } from './../../services/passport'
import bodymen, { errorHandler } from 'bodymen'
import { create, query } from './controller'


const router = new Router()
router.get('/', query)
router.get('/:id', (req, res) => {
    const id = req.params.id //http://localhost:3000/api/users/1 => id = 1
    res.send(id)
    // res.send('GET USER DETAIL')
})
router.post('/', master(), create)

router.put('/:id', token({ required: true, roles: ['admin', 'user'] }), (req, res) => res.send('PUT USER'))
router.delete('/', token({ required: true, roles: ['admin'] }), (req, res) => res.send('DELETE USER'))

export default router