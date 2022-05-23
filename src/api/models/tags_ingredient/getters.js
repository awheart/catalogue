const TagIngredient = require('./schema')

exports.getAll = async filter => TagIngredient.query().select().where(filter ? filter : "")
exports.findById = async id => TagIngredient.query().select().findById(id)
exports.findOne = async filter => TagIngredient.query().findOne(filter)