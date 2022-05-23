const RecipeComment = require('./schema')

exports.getAll = async filter => RecipeComment.query().select().where(filter ? filter : "")
exports.findById = async id => RecipeComment.query().select().findById(id)
exports.findOne = async filter => RecipeComment.query().findOne(filter)