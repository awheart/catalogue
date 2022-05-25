const Recipes = require('./schema')

exports.getAll = async filter => Recipes.query().select().orderBy('created_at', 'desc').where(filter ? filter : '').withGraphFetched('[price, author.[role]]')
exports.findById = async id => Recipes.query().select().findById(id).withGraphFetched('[price, author]')
exports.findOne = async filter => Recipes.query().findOne(filter).withGraphFetched('[price, author]')