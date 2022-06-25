const RecipePrice = require('./schema')

exports.getAll = async () => RecipePrice.query().select()
exports.findById = async id => RecipePrice.query().select().findById(id)
exports.findOne = async filter => RecipePrice.query().findOne(filter)