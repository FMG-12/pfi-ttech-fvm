import db from '../middleware/firebase.js'

export const getCurrencyModel = async () => {
    const snapshot = await db.collection('currencies').get()
    return snapshot.docs.map(doc => doc.data())
}

export const getCurrencyByCode = async (code) => {
    const snapshot = await db.collection('currencies').where('code', '==', code).get()
    return snapshot.docs.map(doc => doc.data())[0]
}
