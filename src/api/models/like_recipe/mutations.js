const LikeRecipe = require('./schema')

exports.create = async user => LikeRecipe.query().insert(user)
exports.deleteById = async id => LikeRecipe.query().deleteById(id)
