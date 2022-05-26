const Users = require('./schema')

exports.getAll = async filter => Users.query().skipUndefined().select().where(filter).withGraphFetched('[role, recipes, comments]')
exports.findById = async id => Users.query().select().findById(id).withGraphFetched('[role]')
exports.findOne = async filter => Users.query().skipUndefined().findOne(filter).withGraphFetched('[role]')