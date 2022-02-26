const mongoose = require('mongoose')
const config = require('./config')

const db = mongoose.connection

// init db connection
const init = async () => {
    try {
        mongoose.connect(config.database.uri, config.database.options)
    } catch (error) {
        console.log('cannot connect to database: \n', error)
    }
}

// close db connection
const closeConnection = async () => {
    try {
        await db.close()
    } catch (error) {
        console.log('cannot close database: \n', error)
    }
}

// on connection
db.on('connected', async () => {
    console.log('mongoose connection is open')
})

// on error
db.on('error', async (error) => {
    console.log('an error occured: \n', error)
    if(error.name === 'MongooseNetworkError') {
        console.log("attempting a reconnection...")
        await init()
    } else {
        console.log('exiting...')
    }
})

// on disconnection
db.on('disconnected', async () => {
    console.log('mongoose connection is disconnected')
})

module.exports = {
    db,
    init,
    closeConnection
}
