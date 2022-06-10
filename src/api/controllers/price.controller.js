const { getters: priceGetters, mutations: priceMutations } = require('../models/price')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// get all prices
module.exports.getAll = asyncAction(async (req, res) => {
    const filter = req.query
    const prices = await priceGetters.getAll(filter)
    res.json(prices)
})

// get one price
module.exports.findOne = asyncAction(async (req, res) => {
    const id = req.params.id
    const price = await priceGetters.findById(id)
    if (!price) return res.status(404).json({ message: Error_Messages.tag_not_found })
    res.json(price)
})
