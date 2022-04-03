const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true,  unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' }
},
{ 
    collection: 'users',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)

module.exports = mongoose.model('User', User)
