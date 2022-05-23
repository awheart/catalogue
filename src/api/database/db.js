const { initRole, initPrice } = require('./index')

exports.initTables = async () => {
    try {
        await initPrice()
        await initRole()
    } catch (err) {
        console.log('errrrrr: ', err)
    }
}

