const server = require('../../src/api/server')
const request = require('supertest')
const data = require('./user.data')
const { initializeDatabase, destroyDatabase, migrateUp, migrateDown, insertUsers } = require('../helpers/database')

describe('USER', () => {

    beforeAll(async () => {
        await initializeDatabase()
        await migrateUp()
        await insertUsers()
    })
    afterAll(async () => {
        await migrateDown()
        await destroyDatabase()
    })

    describe('GET', () => {
        test('all', async () => {
            const { inputs, expects } = data.users.GET.all
            const res = await request(server).get(inputs.url)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expects.all)
        })

    })
    describe('POST', () => {
        test('one', async () => {
            
        })
    })
})
