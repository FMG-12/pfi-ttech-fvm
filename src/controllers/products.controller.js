import { getProductsByFilterService, getProductByIdService, createProductService, deleteProductService } from '../services/products.service.js'
import { getCurrencyByCodeService } from '../services/currency.service.js'

export const getProducts = async (req, res) => {
    try {
        const category = req.query.category
        const minPrice = req.query.minPrice
        const maxPrice = req.query.maxPrice
        const currencyCode = req.query.currency

        if (minPrice && isNaN(minPrice) || maxPrice && isNaN(maxPrice)) {
            return res.status(400).json({ message: 'Los precios deben estar expresados en números' })
        }

        let currency = null
        if (currencyCode) {
            currency = await getCurrencyByCodeService(currencyCode)
            if (!currency) {
                return res.status(400).json({ message: 'Moneda no válida' })
            }
        }

        const minPriceBase = minPrice && currency ? Number(minPrice) / currency.value : minPrice
        const maxPriceBase = maxPrice && currency ? Number(maxPrice) / currency.value : maxPrice

        const products = await getProductsByFilterService({ category, minPrice: minPriceBase, maxPrice: maxPriceBase })

        if (currency) {
            products.forEach(product => {
                product.price = product.price * currency.value
                product.currency = currency.code
            })
        }

        return res.status(200).json(products ?? [])
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" })
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        
        if (!id) return res.status(400).json({ message: 'Se requiere un ID válido' })

        const product = await getProductByIdService(id)
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body
        if (!name || price == null) {
            return res.status(400).json({ message: 'Faltan campos requeridos: name, price' })
        }
        const id = await createProductService(req.body)
        return res.status(201).json({ message: 'Producto creado correctamente', id })
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'Se requiere un ID válido' })
        const product = await deleteProductService(id)
        return res.status(200).json({ message: 'Producto eliminado correctamente', product })
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" })
    }
}