const Ingredient = require('./schema')

exports.create = async user => Ingredient.query().insert(user)
exports.patch = async (id, inputs) => Ingredient.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => Ingredient.query().deleteById(id)
