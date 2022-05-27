const RecipeComment = require('./schema')

exports.getAll = async filter => RecipeComment.query().skipUndefined().select().where(filter)
exports.findById = async id => RecipeComment.query().select().findById(id)
exports.findOne = async filter => RecipeComment.query().skipUndefined().findOne(filter)