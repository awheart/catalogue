const MonthOfConsumtion = require('./schema')

exports.create = async user => MonthOfConsumtion.query().insert(user)
exports.patch = async (id, inputs) => MonthOfConsumtion.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => MonthOfConsumtion.query().deleteById(id)
