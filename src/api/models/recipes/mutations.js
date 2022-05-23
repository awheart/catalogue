const Recipes = require('./schema')

exports.create = async user => Recipes.query().insert(user)
exports.patch = async (id, inputs) => Recipes.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => Recipes.query().deleteById(id)
