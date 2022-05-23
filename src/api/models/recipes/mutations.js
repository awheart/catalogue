const Recipe = require('./schema')

exports.create = async user => Recipe.query().insert(user)
exports.patch = async (id, inputs) => Recipe.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => Recipe.query().deleteById(id)
