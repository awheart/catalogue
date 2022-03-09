const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    author: { type: String, required: true },
    content: { type: String, required: true }
},
{ 
    collection: 'articles',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)

module.exports = mongoose.model('Article', Article)
