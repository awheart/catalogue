const MonthOfConsumtionRecipe = require('./schema')

exports.create = async user => MonthOfConsumtionRecipe.query().insert(user)
exports.patch = async (id, inputs) => MonthOfConsumtionRecipe.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => MonthOfConsumtionRecipe.query().deleteById(id)
