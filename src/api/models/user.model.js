const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    roles: { type: Schema.Types.ObjectId, ref: 'Role' }
})

module.exports = mongoose.model('User', User)