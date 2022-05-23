const RefreshToken = require('./schema')

exports.getAll = async filter => RefreshToken.query().select().where(filter ? filter : "")
exports.findById = async id => RefreshToken.query().select().findById(id)
exports.findOne = async filter => RefreshToken.query().findOne(filter)