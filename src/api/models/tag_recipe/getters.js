const TagRecipe = require('./schema')

exports.getAll = async filter => TagRecipe.query().select().where(filter ? filter : "")
exports.findById = async id => TagRecipe.query().select().findById(id)
exports.findOne = async filter => TagRecipe.query().findOne(filter)