const UserRole = require('./schema')

exports.create = async role => UserRole.query().insert(role)
exports.patch = async (id, inputs) => UserRole.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => UserRole.query().deleteById(id)
