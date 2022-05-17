const User = require('./schema')

exports.create = async user => await User.query().insert(user)
exports.patch = async (id, inputs) => await User.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => User.query().deleteById(id)
