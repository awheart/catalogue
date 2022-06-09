const jwt = require('jsonwebtoken')
const config = require('../config/config')

// check if user is connected
const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        // check if token is valid and verifies secret
        jwt.verify(token.replace(/^Bearer\s/, ''), config.jwt.token, (err) => {
            return (err ? res.status(401).json({ message: 'Unauthorized' }) : next())
        })
    } else {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        // check if token is valid and verifies secret
        jwt.verify(token.replace(/^Bearer\s/, ''), config.jwt.token, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' })
            } else if(decoded.role_id !== 2) return res.status(401).json({ message: 'Unauthorized' })
            next()
        })
    } else {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = {
    isAuthenticated,
    isAdmin
}