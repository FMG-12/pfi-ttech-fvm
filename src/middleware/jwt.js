import jwt from 'jsonwebtoken'
import env from './env.js'

const secret_key = env.JWT_SECRET

export const generateToken = (userData) => {
    const user = { id: userData.id, email: userData.email, role: userData.role }
    const expiration = { expiresIn: '1h' }
    return jwt.sign(user, secret_key, expiration)
}

export const verifyToken = (token) => {
    return jwt.verify(token, secret_key)
}
