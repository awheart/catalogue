const TagRecipe = require('./schema')

exports.create = async ingredient => TagRecipe.query().insert(ingredient)
exports.patch = async (id, inputs) => TagRecipe.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => TagRecipe.query().deleteById(id)
