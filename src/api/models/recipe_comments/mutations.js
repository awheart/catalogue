const RecipeComment = require('./schema')

exports.create = async user => RecipeComment.query().insert(user)
exports.deleteById = async id => RecipeComment.query().deleteById(id)
