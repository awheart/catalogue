const Recipes = require('./schema')

exports.getAll = async filter => Recipes.query().skipUndefined().select().orderBy('created_at', 'desc').where(filter).withGraphFetched('[price, author.[role], steps, comments.[author]]')
exports.findById = async id => Recipes.query().select().findById(id).withGraphFetched('[price, author]')
exports.findOne = async filter => Recipes.query().findOne(filter).withGraphFetched('[price, author]')