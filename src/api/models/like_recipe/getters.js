const LikeRecipe = require('./schema')

exports.getAll = async filter => LikeRecipe.query().select().where(filter ? filter : "")
exports.findById = async id => LikeRecipe.query().select().findById(id)
exports.findOne = async filter => LikeRecipe.query().findOne(filter)