const Recipes = require('./schema')

exports.create = async recipe => Recipes.query().insertGraph(recipe, { allowRefs: true })
exports.patch = async (id, inputs) => Recipes.query().patchAndFetchById(id, inputs)
exports.deleteById = async id => Recipes.query().deleteById(id)
