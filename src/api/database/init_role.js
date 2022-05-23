const { getters: userRoleGetter, mutations: userRoleMutations } = require('../models/user_role')

const initRole = async () => {
    try {
        const existRole = await userRoleGetter.getAll()
        if (existRole.length === 0) {
            await userRoleMutations.create({ 'role_name': 'user' })
            await userRoleMutations.create({ 'role_name': 'admin' })
        } else console.log('Roles already initialized')
    } catch (err) {
        console.log(console.log('role error: ',err))
    }

}

module.exports = initRole