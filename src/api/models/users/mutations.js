const User = require('./schema')

exports.create = async user => await User.query().insert(user)
exports.deleteById = async id => User.query().deleteById(id)
