const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    creator: { type: String, required: true },
    posted_by: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    date_of_creation: { type: Date, required: true },
    description: { type: String, required: true },
    comments: [{
            body: {
                type: String, required: true
            },
            by: {
                type: Schema.Types.ObjectId, ref: 'users'
            }
        }
    ]
},
    {
        collection: 'articles',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

module.exports = mongoose.model('Article', Article)
