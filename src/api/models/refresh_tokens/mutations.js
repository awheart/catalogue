const RefreshToken = require('./schema')

exports.create = async token => RefreshToken.query().insert(token)
