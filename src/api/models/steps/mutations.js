const Step = require('./schema')

exports.create = async step => Step.query().insert(step)
exports.deleteById = async id => Step.query().deleteById(id)
