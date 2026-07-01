import { createUserService, updateUserService } from '../services/user.service.js'

export const createUser = async (req, res) => {
    try {
        if (!req.body.role) {
            req.body.role = 'user'
        }

        const { email, password, role } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' })
        }

        const user = await createUserService({ email, password, role })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await updateUserService(req.user.id, { email, password })
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

