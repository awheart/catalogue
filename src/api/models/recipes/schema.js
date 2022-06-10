const model = require('../model')

class Recipes extends model {
    static get tableName() {
        return 'recipes'
    }
    static get idColumn() {
        return 'id'
    }
    static get relationMappings() {
        // import here to avoid require loop
        const ListIngredient = require('../list_ingredient/schema')
        const Months = require('../months/schema')
        const Comments = require('../comments/schema')
        const RecipePrice = require('../recipe_price/schema')
        const Step = require('../steps/schema')
        const Tags = require('../tags/schema')
        const Users = require('../users/schema')
        return {
            author: {
                relation: model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'recipes.user_id',
                    to: 'users.id'
                }
            },
            price: {
                relation: model.BelongsToOneRelation,
                modelClass: RecipePrice,
                join: {
                    from: 'recipes.price_id',
                    to: 'recipe_price.id'
                }
            },
            steps: {
                relation: model.HasManyRelation,
                modelClass: Step,
                join: {
                    from: 'recipes.id',
                    to: 'step.recipe_id'
                }
            },
            tags: {
                relation: model.ManyToManyRelation,
                modelClass: Tags,
                join: {
                    from: 'recipes.id',
                    through: {
                        from: 'tag_recipe.recipe_id',
                        to: 'tag_recipe.tag_id'
                    },
                    to: 'tags.id'
                }
            },
            months: {
                relation: model.ManyToManyRelation,
                modelClass: Months,
                join: {
                    from: 'recipes.id',
                    through: {
                        from: 'month_of_consumption.recipe_id',
                        to: 'month_of_consumption.month_id'
                    },
                    to: 'months.id'
                }
            },
            list_ingredient: {
                relation: model.HasManyRelation,
                modelClass: ListIngredient,
                join: {
                    from: 'recipes.id',
                    to: 'list_ingredient.recipe_id'
                }
            },
            comments: {
                relation: model.HasManyRelation,
                modelClass: Comments,
                join: {
                    from: 'recipes.id',
                    to: 'comments.recipe_id'
                }
            },
            likes: {
                relation: model.ManyToManyRelation,
                modelClass: Users,
                join: {
                    from: 'recipes.id',
                    through: {
                        from: 'like_recipe.recipe_id',
                        to: 'like_recipe.user_id'
                    },
                    to: 'users.id'
                }
            }
        }
    }
    static get virtualAttributes() {
        return ['total_time']
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                description: { type: 'string' },
                nbr_person: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 100,
                },
                is_published: { type: 'boolean' },
                prep_time: {
                    type: 'number',
                    multipleOf: 0.5,
                    minimum: 0,
                    maximum: 10080,
                },
                cook_time: {
                    type: 'number',
                    multipleOf: 0.5,
                    minimum: 0,
                    maximum: 10080,
                },
                image: { type: 'string' },
                price_id: { type: 'integer' },
                user_id: { type: 'integer' }
            }
        }
    }
    get total_time() {
        return this.prep_time + this.cook_time
    }
    $beforeInsert() {
        this.created_at = new Date()
        this.updated_at = new Date()
    }
    $beforeUpdate() {
        this.updated_at = new Date()
    }
}

module.exports = Recipes
