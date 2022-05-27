const Month = require('./schema')

exports.getAll = async () => Month.query().select()
exports.findById = async id => Month.query().select().findById(id)
exports.findOne = async filter => Month.query().findOne(filter)