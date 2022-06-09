const UserRole = require('./schema')

exports.create = async role => UserRole.query().insert(role)
exports.deleteById = async id => UserRole.query().deleteById(id)
