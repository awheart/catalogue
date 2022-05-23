const model = require('../model')

class Recipes extends model {
    static get tableName() {
        return 'recipes'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                author: { type: 'string' },
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
                price: { type: 'string', enum: ['bon marché', 'accessible', 'je me fais plaisir'] }
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
