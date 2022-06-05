const server = require('../../src/api/server')
const request = require('supertest')
const data = require('./user.data')
const { initTables } = require('../../src/api/database/db')
const { migrateUp, migrateDown, insertUsers, initializeDatabase, destroyDatabase } = require('../helpers/database')
jest.setTimeout(10000)

let token
describe('USER', () => {
    beforeAll(async () => {
        await initializeDatabase()
        await migrateUp()
        await initTables()
        await insertUsers()
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


    describe('GET', () => {
        test('all', async () => {
            const { inputs, expects } = data.users.GET.all
            const res = await request(server)
                .get(inputs.url)
                .set('Authorization', `Bearer ${token}`)
            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expects.all)
        })
        test('by id', async () => {
            const { inputs, expects } = data.users.GET.by_id
            const res = await request(server)
                .get(inputs.url)
                .set('Authorization', `Bearer ${token}`)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expects.by_id)
        })
        test('by filter', async () => {
            const { inputs, expects } = data.users.GET.by_filter
            const res = await request(server)
                .get(inputs.url)
                .set('Authorization', `Bearer ${token}`)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expects.by_filter)
        })
        test('invalid id', async () => {
            const { inputs, expects } = data.users.GET.invalid_id
            const res = await request(server)
                .get(inputs.url)
                .set('Authorization', `Bearer ${token}`)

            expect(res.statusCode).toBe(404)
            expect(res.body).toEqual(expects.invalid_id)
        })
    })
    describe('POST', () => {
        test('one', async () => {
            const { inputs, expects } = data.users.POST.one
            const res = await request(server)
                .post(inputs.url)
                .set('Authorization', `Bearer ${token}`)
                .send(inputs.body)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expects.one)
        })
        test('invalid email', async () => {
            const { inputs, expects } = data.users.POST.invalid_email
            const res = await request(server)
                .post(inputs.url)
                .set('Authorization', `Bearer ${token}`)
                .send(inputs.body)

            expect(res.statusCode).toBe(422)
            expect(res.body).toEqual(expects.invalid_email)
        })
        test('username already in use', async () => {
            const { inputs, expects } = data.users.POST.username_existing
            const res = await request(server)
                .post(inputs.url)
                .set('Authorization', `Bearer ${token}`)
                .send(inputs.body)

            expect(res.statusCode).toBe(422)
            expect(res.body).toEqual(expects.username_existing)
        })
    })
    describe('PATCH', () => {
        test('update user', async () => {
            const { inputs, expects } = data.users.PATCH.update_user
            const res = await request(server)
                .patch(inputs.url)
                .set('Authorization', `Bearer ${token}`)
                .send(inputs.body)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expects.update_user)
        })
        test('user not found', async () => {
            const { inputs, expects } = data.users.PATCH.update_failed
            const res = await request(server)
                .patch(inputs.url)
                .set('Authorization', `Bearer ${token}`)
                .send(inputs.body)

            expect(res.statusCode).toBe(422)
            expect(res.body).toEqual(expects.update_failed)
        })
    })
    describe('DELETE', () => {
        test('delete user', async () => {
            const { inputs, expects } = data.users.DELETE.delete_user
            const res = await request(server)
                .delete(inputs.url)
                .set('Authorization', `Bearer ${token}`)
                .send(inputs.body)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expects.delete_user)
        })
        test('user not found', async () => {
            const { inputs, expects } = data.users.DELETE.delete_failed
            const res = await request(server)
                .delete(inputs.url)
                .set('Authorization', `Bearer ${token}`)
                .send(inputs.body)

            expect(res.statusCode).toBe(404)
            expect(res.body).toEqual(expects.delete_failed)
        })
    })
})
