const model = require('../model')
const UserRole = require('../user_role/schema')

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
                icone: { type: 'string' }
            }
        }
    }
    static get relationMappings() {
        return {
            role: {
                relation: model.HasOneRelation,
                modelClass: UserRole,
                join: {
                    from: 'users.id',
                    to: 'user_role.id'
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
