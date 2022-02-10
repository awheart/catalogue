const jwt = require('jsonwebtoken')

const config = {
    authSecret: 'secret' // secret to generate jwt token
}

// check if user is connecter 
module.exports.isAuthentificated = (req, res, next) => {
    var token = req.headers.authorization
    if (token) {
        // check if token is valid and verifies secret
        jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, (err, decoded) => {
            return (err ? res.status(401).json({ message: 'Unauthorized' }) :  next())
        })
    } else {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}



module.exports = {
    database: {
        uri: 'mongodb://localhost:207017/catalogue',
        options: { useUnifiedTopology: true }
    },
    server: { port: process.env.PORT || 8000 },
    config
}