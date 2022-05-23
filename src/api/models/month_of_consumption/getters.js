const MonthOfConsumtion = require('./schema')

exports.getAll = async filter => MonthOfConsumtion.query().select().where(filter ? filter : "")
exports.findById = async id => MonthOfConsumtion.query().select().findById(id)
exports.findOne = async filter => MonthOfConsumtion.query().findOne(filter)