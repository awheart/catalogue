const { getters: recipePriceGetter, mutations: recipePriceMutations } = require('../models/price')

const initPrice = async () => {
    try {
        const existPrice = await recipePriceGetter.getAll()
        if (existPrice.length === 0) {
            await recipePriceMutations.create({ 'price_name': 'bon marché' })
            await recipePriceMutations.create({ 'price_name': 'accessible' })
            await recipePriceMutations.create({ 'price_name': 'je me fais plaisir' })
        } else console.log('prices already initialized')
    } catch (err) {
        console.log('price error: ', err)
    }

}

module.exports = initPrice