const RecipeComment = require('./schema')

exports.create = async comment => RecipeComment.query().insertGraph(comment)
exports.patch = async (id, inputs) => RecipeComment.query().patchAndFetchById(id, inputs)
exports.deleteById = async id => RecipeComment.query().deleteById(id)
