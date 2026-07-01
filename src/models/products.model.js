import db from '../middleware/firebase.js'

export const getProductsModel = async () => {
    const snapshot = await db.collection('products').get()
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getProductsByFilterModel = async (filter) => {
    let query = db.collection('products')

    if (filter.category) {
        query = query.where('category', '==', filter.category)
    }

    const snapshot = await query.get()
    let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    if (filter.minPrice != null && filter.minPrice !== '') {
        const min = Number(filter.minPrice)
        products = products.filter(p => Number(p.price) >= min)
    }

    if (filter.maxPrice != null && filter.maxPrice !== '') {
        const max = Number(filter.maxPrice)
        products = products.filter(p => Number(p.price) <= max)
    }

    return products
}

export const getProductByIdModel = async (id) => {
    const snap = await db.collection('products').doc(id).get()
    return snap.exists ? { id: snap.id, ...snap.data() } : null
}

export const createProductModel = async (product) => {
    const newProduct = await db.collection('products').add(product)
    return newProduct.id
}

export const deleteProductModel = async (id) => {
    await db.collection('products').doc(id).delete()
}
