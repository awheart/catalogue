const Users = require('./schema')

exports.getAll = async filter => Users.query().select().orderBy('created_at', 'desc').where(filter).withGraphFetched('[role]')
exports.findById = async id => Users.query().select().findById(id).withGraphFetched('[role]')
exports.findOne = async filter => Users.query().findOne(filter).withGraphFetched('[role]')