const Step = require('./schema')

exports.create = async step => Step.query().insert(step)
exports.patch = async (id, inputs) => Step.query().updateAndFetchById(id, inputs)
exports.deleteById = async id => Step.query().deleteById(id)
