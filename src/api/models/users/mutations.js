const User = require('./schema')

exports.create = async user => User.query().insert(user)
exports.patch = async (id, inputs) => User.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => User.query().deleteById(id)
