const model = require('../model')

class Recipe extends model {
    static get tableName() {
        return 'recipe'
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
                nbr_person: { type: 'integer' },
                is_published: { type: 'boolean' },
                prep_time: { type: 'decimal' },
                cook_time: { type: 'decimal' },
                image: { type: 'string' },
                price: { type: 'decimal' }
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

module.exports = Recipe
