const User = require('./schema')

exports.getAll = async () => User.query().select().orderBy('created_at', 'desc')
exports.findById = async id => User.query().select().findById(id)
exports.findOne = async filter => User.query().findOne(filter)