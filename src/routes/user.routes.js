import { Router } from 'express'
import { createUser, updateUser } from '../controllers/user.controller.js'
import { adminOnly } from '../middleware/auth.js'

const router = Router()

router.post('/register', adminOnly, createUser)

// esta ruta toma el usuario desde el token, para asegurar que solo puedas actualizar tu propio usuario
router.put('/update', updateUser)

export default router