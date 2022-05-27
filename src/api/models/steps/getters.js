const Step = require('./schema')

exports.getAll = async filter => Step.query().skipUndefined().select().where(filter)
exports.findById = async id => Step.query().select().findById(id)
exports.findOne = async filter => Step.query().skipUndefined().findOne(filter)