const { getters: recipePriceGetter, mutations: recipePriceMutations } = require('../models/recipe_price')

const initPrice = async () => {
    try {
        const existPrice = await recipePriceGetter.getAll('')
        if (existPrice.length === 0) {
            await recipePriceMutations.create({ 'price': 'bon marché' })
            await recipePriceMutations.create({ 'price': 'accessible' })
            await recipePriceMutations.create({ 'price': 'je me fais plaisir' })
        } else console.log('prices already initialized')
    } catch (err) {
        console.log('price error: ', err)
    }

}

module.exports = initPrice