const Users = require('./schema')

exports.getAll = async filter => Users.query().select().orderBy('created_at', 'desc').where(filter)
exports.findById = async id => Users.query().select().findById(id)
exports.findOne = async filter => Users.query().findOne(filter)