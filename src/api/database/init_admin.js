const { getters: usersGetters, mutations: usersMutations } = require('../models/users')
const encryption = require('../utils/encryption')

const initAdmin = async () => {
    try {
        const adminAccount = {
            username: 'admin',
            email: 'admin@gmail.com',
            password: encryption.password('admin'),
            role_id: 2
        }
        const existAdmin = await usersGetters.findOne({ email: adminAccount.email })
        if (!existAdmin) {
            await usersMutations.create(adminAccount)
        } else console.log('admin already initialized')
    } catch (err) {
        console.log('admin error: ', err)
    }
}

module.exports = initAdmin