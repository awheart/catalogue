const server = require('../../src/api/server')
const request = require('supertest')
const data = require('./recipe.data')
const { initTables } = require('../../src/api/database/db')
const { migrateUp, migrateDown, insertRecipes, insertUsers } = require('../helpers/database')

describe('RECIPE', () => {
    beforeAll(async () => {
        await migrateUp()
        await initTables()
        await insertUsers()
        await insertRecipes()
    })
    afterAll(async () => {
        await migrateDown()
    })


    describe('GET', () => {
        test('all', async () => {
            const { inputs, expects } = data.recipes.GET.all
            const res = await request(server)
                .get(inputs.url)

            expect(res.body).toEqual(expects.all)
            // expect(res.statusCode).toBe(200)
            console.log(res)
        })
        //     test('by id', async () => {
        //         const { inputs, expects } = data.recipes.GET.by_id
        //         const res = await request(server)
        //             .get(inputs.url)

        //         expect(res.statusCode).toBe(200)
        //         expect(res.body).toEqual(expects.by_id)
        //     })
        //     test('by filter', async () => {
        //         const { inputs, expects } = data.recipes.GET.by_filter
        //         const res = await request(server)
        //             .get(inputs.url)

        //         expect(res.statusCode).toBe(200)
        //         expect(res.body).toEqual(expects.by_filter)
        //     })
        //     test('invalid id', async () => {
        //         const { inputs, expects } = data.recipes.GET.invalid_id
        //         const res = await request(server)
        //             .get(inputs.url)

        //         expect(res.statusCode).toBe(404)
        //         expect(res.body).toEqual(expects.invalid_id)
        //     })

        // })
        // describe('POST', () => {
        //     test('one', async () => {
        //         const { inputs, expects } = data.recipes.POST.one
        //         const res = await request(server)
        //             .post(inputs.url)
        //             .set('Accept', 'application/json')
        //             .send(inputs.body)

        //         expect(res.statusCode).toBe(200)
        //         expect(res.body).toEqual(expects.one)
        //     })
        //     test('title already in use', async () => {
        //         const { inputs, expects } = data.recipes.POST.recipename_existing
        //         const res = await request(server)
        //             .post(inputs.url)
        //             .set('Accept', 'application/json')
        //             .send(inputs.body)

        //         expect(res.statusCode).toBe(422)
        //         expect(res.body).toEqual(expects.recipename_existing)
        //     })
        // })
        // describe('PATCH', () => {
        //     test('update recipe', async () => {
        //         const { inputs, expects } = data.recipes.PATCH.update_recipe
        //         const res = await request(server)
        //             .patch(inputs.url)
        //             .send(inputs.body)
        //         expect(res.statusCode).toBe(200)
        //         expect(res.body).toEqual(expects.update_recipe)
        //     })
        //     test('recipe not found', async () => {
        //         const { inputs, expects } = data.recipes.PATCH.update_failed
        //         const res = await request(server)
        //             .patch(inputs.url)
        //             .send(inputs.body)

        //         expect(res.statusCode).toBe(422)
        //         expect(res.body).toEqual(expects.update_failed)
        //     })
        // })
        // describe('DELETE', () => {
        //     test('delete recipe', async () => {
        //         const { inputs, expects } = data.recipes.DELETE.delete_recipe
        //         const res = await request(server)
        //             .delete(inputs.url)
        //             .send(inputs.body)

        //         expect(res.statusCode).toBe(200)
        //         expect(res.body).toEqual(expects.delete_recipe)
        //     })
        //     test('recipe not found', async () => {
        //         const { inputs, expects } = data.recipes.DELETE.delete_failed
        //         const res = await request(server)
        //             .delete(inputs.url)
        //             .send(inputs.body)

        //         expect(res.statusCode).toBe(404)
        //         expect(res.body).toEqual(expects.delete_failed)
        //     })
    })
})
