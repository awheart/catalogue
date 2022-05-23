const Step = require('./schema')

exports.create = async user => Step.query().insert(user)
exports.patch = async (id, inputs) => Step.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => Step.query().deleteById(id)
