const RecipeComment = require('./schema')

exports.create = async comment => RecipeComment.query().insert(comment)
exports.deleteById = async id => RecipeComment.query().deleteById(id)
