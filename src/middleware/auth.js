import { verifyToken } from './jwt.js'

export const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }
    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' })
    }
}

//middleware para rutas que requieren rol administrador.
export const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: se requiere rol administrador' })
    }
    next()
}