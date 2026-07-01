import { getCurrencyByCode } from '../models/currency.model.js'

export const getCurrencyByCodeService = async (code) => {
    return await getCurrencyByCode(code)
}

