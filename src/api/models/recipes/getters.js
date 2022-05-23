const Recipes = require('./schema')

exports.getAll = async filter => Recipes.query().select().orderBy('created_at', 'desc').where(filter ? filter : '')
exports.findById = async id => Recipes.query().select().findById(id)
exports.findOne = async filter => Recipes.query().findOne(filter)