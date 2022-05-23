const Recipe = require('./schema')

exports.getAll = async filter => Recipe.query().select().orderBy('created_at', 'desc').where(filter ? filter : "")
exports.findById = async id => Recipe.query().select().findById(id)
exports.findOne = async filter => Recipe.query().findOne(filter)