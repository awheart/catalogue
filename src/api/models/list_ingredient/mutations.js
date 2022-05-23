const ListIngredient = require('./schema')

exports.create = async user => ListIngredient.query().insert(user)
exports.patch = async (id, inputs) => ListIngredient.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => ListIngredient.query().deleteById(id)
