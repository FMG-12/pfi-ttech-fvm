import { loginService } from '../services/auth.service.js'
import { generateToken } from '../middleware/jwt.js'

export const login = async (req, res) => {
    try {
        
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' })
        }
        
        const { email, password } = req.body

        const user = await loginService({ email, password })
 
        if (user) {
            const token = generateToken(user)
            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: 'Email o contraseña incorrectos' })
        }
 
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}
