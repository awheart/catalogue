const User = require('./schema')

// exports.create = async () => await User.query().insert({username: 'admin', password: 'admin', email: 'admin@example.com', role: 'admin', social_media: 'facebook', icone: {icone: 'icone'}})

exports.create = async user => await User.query().insert(user)
exports.deleteById = async id => User.query().deleteById(id)
