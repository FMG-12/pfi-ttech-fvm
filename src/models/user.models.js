import db from '../middleware/firebase.js'

export const getUserById = async (id) => {
    const snapshot = await db.collection('users').doc(id).get()
    return snapshot.data()
}

export const createUser = async (user) => {
    const snapshot = await db.collection('users').add(user)
    return snapshot.id
}

export const updateUser = async (id, user) => {
    await db.collection('users').doc(id).update(user)
    return true
}

export const deleteUser = async (id) => {
    await db.collection('users').doc(id).delete()
    return true
}