const server = require('../../src/api/server')
const request = require('supertest')
const data = require('./recipe.data')
const { initTables } = require('../../src/api/database/db')
const { migrateUp, migrateDown, insertRecipes, initializeDatabase, destroyDatabase, insertUsers, insertTags } = require('../helpers/database')
jest.setTimeout(10000)

let token
describe('RECIPES', () => {
    beforeAll(async () => {
        await initializeDatabase()
        await migrateUp()
        await initTables()
        await insertUsers()
        await insertTags()
        await insertRecipes()
        const res = await request(server)
            .post('/api/users/login')
            .send({
                email: 'admin@gmail.com',
                password: 'admin'
            })
        token = res.body.token
    })
    afterAll(async () => {
        await migrateDown()
        await destroyDatabase()
    })
    test('PATCH', async () => {
        const { inputs, expects } = data.recipes.PATCH.update_recipe
        const res = await request(server)
            .patch(inputs.url)
            .set('Authorization', `Bearer ${token}`)
            .send(inputs.body)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(expects.update_recipe)
    })
})