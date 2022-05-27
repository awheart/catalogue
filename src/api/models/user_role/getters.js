const UserRole = require('./schema')

exports.getAll = async () => UserRole.query().select()
exports.findById = async id => UserRole.query().select().findById(id)
exports.findOne = async filter => UserRole.query().findOne(filter)