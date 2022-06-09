const ListIngredient = require('./schema')

exports.getAll = async filter => ListIngredient.query().select().where(filter)
exports.findById = async id => ListIngredient.query().select().findById(id)
exports.findOne = async filter => ListIngredient.query().findOne(filter)