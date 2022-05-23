const TagIngredient = require('./schema')

exports.create = async user => TagIngredient.query().insert(user)
exports.deleteById = async id => TagIngredient.query().deleteById(id)
