const Ingredient = require('./schema')

exports.getAll = async filter => Ingredient.query().select().where(filter ? filter : "")
exports.findById = async id => Ingredient.query().select().findById(id)
exports.findOne = async filter => Ingredient.query().findOne(filter)