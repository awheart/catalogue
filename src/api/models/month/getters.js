const Month = require('./schema')

exports.getAll = async filter => Month.query().select().where(filter ? filter : "")
exports.findById = async id => Month.query().select().findById(id)
exports.findOne = async filter => Month.query().findOne(filter)