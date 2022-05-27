const { getters: monthsGetter, mutations: monthsMutations } = require('../models/months')

const initMonths = async () => {
    try {
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
        const existPrice = await monthsGetter.getAll()
        if (existPrice.length === 0) {
            for (const monthName of months) {
                await monthsMutations.create({ month: monthName})
            }
        } else console.log('months already initialized')
    } catch (err) {
        console.log('month error: ', err)
    }

}

module.exports = initMonths