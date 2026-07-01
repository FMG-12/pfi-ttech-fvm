import { getUserById, createUser, updateUser, deleteUser } from '../models/user.models.js'
import bcrypt from 'bcrypt'

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

export const createUserService = async (user) => {
    user.password = hashPassword(user.password)
    return await createUser(user)
}

export const updateUserService = async (id, user) => {
    if (user.password) {
        user.password = hashPassword(user.password)
    }
    return await updateUser(id, user)
}