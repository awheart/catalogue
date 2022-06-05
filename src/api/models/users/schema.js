const model = require('../model')

class Users extends model {
    static get tableName() {
        return 'users'
    }
    static get idColumn() {
        return 'id'
    }
    static get virtualAttributes() {
        return ['age']
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
                birth_date: { type: 'string' },
                role_id: { type: 'integer' }
            }
        }
    }
    get age() {
        if(!this.birth_date) return null
        const united = this.birth_date.split('-').join('')
        var year = Number(united.substring(0, 4))
        var month = Number(united.substring(4, 6)) - 1
        var day = Number(united.substring(6, 8))
        var today = new Date()
        var age = today.getFullYear() - year
        if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) age--
        return age
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
            },
            liked_recipes: {
                relation: model.ManyToManyRelation,
                modelClass: Recipes,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'like_recipe.user_id',
                        to: 'like_recipe.recipe_id'
                    },
                    to: 'recipes.id'
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
