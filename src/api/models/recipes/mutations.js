const Recipes = require('./schema')

exports.create = async recipe => Recipes.query().insert(recipe)
exports.patch = async (id, inputs) => Recipes.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => Recipes.query().deleteById(id)
