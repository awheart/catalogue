const model = require('../model')

class UserRole extends model {
    static get tableName() {
        return 'user_role'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                role_name: { type: 'string' }
            }
        }
    }
}

module.exports = UserRole
