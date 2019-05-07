import { Router } from 'express'
import { master, token } from './../../services/passport'
import bodymen, { errorHandler } from 'bodymen'
import { create, query } from './controller'


const router = new Router()
router.get('/', query
    // (req, res) => {
    //     const q = req.query //get query
    //     res.send(q) //http://localhost:3000/api/users?data=xyz => data = xyz
    //     // res.send('GET LIST USER')
    // }
)
router.get('/:id', (req, res) => {
    const id = req.params.id //http://localhost:3000/api/users/1 => id = 1
    res.send(id)
    // res.send('GET USER DETAIL')
})
// router.post('/', master(), bodymen.middleware({
//     username: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 3
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 8
//     }
// }), create)

// router.post('/', (req, res) => res.send('POST USER'))
router.post('/', master(), create)

router.put('/:id', token({ required: true, roles: ['admin', 'user'] }), (req, res) => res.send('PUT USER'))
router.delete('/', token({ required: true, roles: ['admin'] }), (req, res) => res.send('DELETE USER'))

export default router