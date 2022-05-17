const User = require('./schema')

exports.getAll = async filter => User.query().select().orderBy('created_at', 'desc').where(filter ? filter : "")
exports.findById = async id => User.query().select().findById(id)
exports.findOne = async filter => User.query().findOne(filter)