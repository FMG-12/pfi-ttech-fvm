import db from '../middleware/firebase.js'

export const loginModel = async (email) => {
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get()
    if (snapshot.empty) return null
    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() }
}
