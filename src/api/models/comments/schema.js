const model = require('../model')
const Recipes = require('../recipes/schema')
const Users = require('../users/schema')

class Comments extends model {
    static get tableName() {
        return 'comments'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                content: { type: 'string' },
                user_id: { type: 'integer' }
            }
        }
    }
    static get relationMappings() {
        // import here to avoid require loop
        return {
            author: {
                relation: model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'comments.user_id',
                    to: 'users.id'
                }
            },
            recipe: {
                relation: model.BelongsToOneRelation,
                modelClass: Recipes,
                join: {
                    from: 'comments.recipe_id',
                    to: 'recipes.id'
                }
            }
        }
    }
    $beforeInsert() {
        this.created_at = new Date()
    }
}

module.exports = Comments
