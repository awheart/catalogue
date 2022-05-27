const MonthOfConsumtion = require('./schema')

exports.create = async monthOfConsumption => MonthOfConsumtion.query().insert(monthOfConsumption)
exports.patch = async (id, inputs) => MonthOfConsumtion.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => MonthOfConsumtion.query().deleteById(id)
