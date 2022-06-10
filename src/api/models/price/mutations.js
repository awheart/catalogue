const RecipePrice = require('./schema')

exports.create = async price => RecipePrice.query().insert(price)
exports.patch = async (id, inputs) => RecipePrice.query().patchAndFetchById(id, inputs)
exports.deleteById = async id => RecipePrice.query().deleteById(id)
