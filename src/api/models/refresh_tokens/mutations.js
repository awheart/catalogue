const RefreshToken = require('./schema')

exports.create = async user => RefreshToken.query().insert(user)
