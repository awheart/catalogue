const bcrypt = require('bcryptjs')

exports.password = (password = '') => {
    const salt = bcrypt.genSaltSync(process.env.HASH || 10)
    return bcrypt.hashSync(password, salt)
}
exports.compare = (password, currentPassword) => bcrypt.compareSync(password, currentPassword)