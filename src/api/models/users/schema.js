const model = require('../model')


class Users extends model {
    static get tableName() {
        return 'users'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                icone: { type: 'string' },
                role_id: { type: 'integer' }
            }
        }
    }
    static get relationMappings() {
        // import here to avoid require loop
        const Recipes = require('../recipes/schema')
        const RecipeComment = require('../comments/schema')
        const UserRole = require('../user_role/schema')
        return {
            role: {
                relation: model.BelongsToOneRelation,
                modelClass: UserRole,
                join: {
                    from: 'users.role_id',
                    to: 'user_role.id'
                }
            },
            recipes: {
                relation: model.HasManyRelation,
                modelClass: Recipes,
                join: {
                    from: 'users.id',
                    to: 'recipes.user_id'
                }
            },
            comments: {
                relation: model.HasManyRelation,
                modelClass: RecipeComment,
                join: {
                    from: 'users.id',
                    to: 'comments.user_id'
                }
            }
        }
    }
    $beforeInsert() {
        this.created_at = new Date()
        this.updated_at = new Date()
    }
    $beforeUpdate() {
        this.updated_at = new Date()
    }
}

module.exports = Users
