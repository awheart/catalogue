const Tag = require('./schema')

exports.getAll = async filter => Tag.query().select().where(filter ? filter : "")
exports.findById = async id => Tag.query().select().findById(id)
exports.findOne = async filter => Tag.query().findOne(filter)