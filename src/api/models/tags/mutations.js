const Tag = require('./schema')

exports.create = async tag => Tag.query().insert(tag)
exports.deleteById = async id => Tag.query().deleteById(id)
