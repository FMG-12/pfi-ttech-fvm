import { loginModel } from '../models/auth.model.js'
import bcrypt from 'bcrypt'

export const loginService = async ({ email, password }) => {
    const user = await loginModel(email)
    if (!user) return null
    const match = await bcrypt.compare(password, user.password)
    return match ? user : null
}