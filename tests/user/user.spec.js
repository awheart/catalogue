const server = require('../../src/api/server')
const data = require('./user.data')

const userEntity = require('../../src/api/models/users/schema')

const insertMockData = async () => {
    for (const user of data.insertIntoDB) {
        console.log(user)
        await userEntity.query().insert(user)
    }
}

describe('USER', () => {
    beforeAll(async () => {})
    beforeEach(async () => {
        await insertMockData()
    })
    describe('GET', () => {
        test('all', async () => {
            const res = await request(server).get('/users').send()
            expect(res.body).toEqual(data.insertIntoDB)

        })
    })
})