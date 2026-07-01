import { getProductsModel, getProductByIdModel, createProductModel, deleteProductModel, getProductsByFilterModel } from '../models/products.model.js'

export const getProductsService = async () => {
    return await getProductsModel()
}

export const getProductsByFilterService = async (filter) => {
    return await getProductsByFilterModel(filter)
}

export const getProductByIdService = async (id) => {
    return await getProductByIdModel(id)
}

export const createProductService = async (product) => {
    return await createProductModel(product)
}

export const deleteProductService = async (id) => {
    return await deleteProductModel(id)
}