const Step = require('./schema')

exports.getAll = async filter => Step.query().select().where(filter ? filter : "")
exports.findById = async id => Step.query().select().findById(id)
exports.findOne = async filter => Step.query().findOne(filter)