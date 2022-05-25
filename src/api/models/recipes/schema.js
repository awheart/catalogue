const ListIngredient = require('../list_ingredient/schema')
const model = require('../model')
const Months = require('../months/schema')
const RecipeComment = require('../recipe_comments/schema')
const RecipePrice = require('../recipe_price/schema')
const Step = require('../steps/schema')
const Tags = require('../tags/schema')
const Users = require('../users/schema')

class Recipes extends model {
    static get tableName() {
        return 'recipes'
    }
    static get idColumn() {
        return 'id'
    }
    static get relationMappings() {
        return {
            author: {
                relation: model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'recipes.author_id',
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
            step: {
                relation: model.HasManyRelation,
                modelClass: Step,
                join: {
                    from: 'recipes.id',
                    to: 'step.id'
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
                    to: 'tag.id'
                }
            },
            months_of_consumption: {
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
                    to: 'list_ingredient.id'
                }
            },
            comments: {
                relation: model.HasManyRelation,
                modelClass: RecipeComment,
                join: {
                    from: 'recipes.id',
                    to: 'recipe_comment.id'
                }
            },
            likes: {
                relation: model.ManyToManyRelation,
                modelClass: Users,
                join: {
                    from: 'recipes.id',
                    through: {
                        from: 'like_recipe.recipe_id',
                        to: 'like_recipe.month_id'
                    },
                    to: 'users.id'
                }
            }
        }
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
                    maximum: 10,
                },
                is_published: { type: 'boolean' },
                prep_time: {
                    type: 'number',
                    multipleOf: 0.1,
                    minimum: 0,
                    maximum: 10080,
                },
                cook_time: {
                    type: 'number',
                    multipleOf: 0.1,
                    minimum: 0,
                    maximum: 10080,
                },
                image: { type: 'string' },
                price_id: { type: 'integer' },
                author_id: { type: 'integer' }
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

module.exports = Recipes
