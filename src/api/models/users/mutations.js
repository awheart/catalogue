const Users = require('./schema')

exports.create = async user => Users.query().insert(user)
exports.patch = async (id, inputs) => Users.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => Users.query().deleteById(id)
