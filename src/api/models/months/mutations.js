const Month = require('./schema')

exports.create = async month => Month.query().insert(month)
exports.patch = async (id, inputs) => Month.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => Month.query().deleteById(id)
