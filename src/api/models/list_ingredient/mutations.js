const ListIngredient = require('./schema')

exports.create = async user => ListIngredient.query().insert(user)
exports.deleteById = async id => ListIngredient.query().deleteById(id)
