import express from 'express'
import { getProducts, getProductById, createProduct, deleteProduct } from '../controllers/products.controller.js'
import { adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.post('/products/create', adminOnly, createProduct)
router.delete('/products/:id', adminOnly, deleteProduct)

export default router
