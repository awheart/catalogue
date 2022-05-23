const MonthOfConsumtionRecipe = require('./schema')

exports.getAll = async filter => MonthOfConsumtionRecipe.query().select().where(filter ? filter : "")
exports.findById = async id => MonthOfConsumtionRecipe.query().select().findById(id)
exports.findOne = async filter => MonthOfConsumtionRecipe.query().findOne(filter)