const jwt = require('jsonwebtoken')

const configSecret = {
    authSecret: 'secret' // secret to generate jwt token
}

// check if user is connecter 
module.exports.isAuthenticated = async (req, res, next) => {
    var token = req.headers.authorization
    if (token) {
        // check if token is valid and verifies secret
        jwt.verify(token.replace(/^Bearer\s/, ''), configSecret.authSecret, (err) => {
            return (err ? res.status(401).json({ message: 'Unauthorized' }) : next())
        })
    } else {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}


module.exports = {
    configSecret
}