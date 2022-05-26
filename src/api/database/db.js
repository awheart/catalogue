const { initRole, initPrice, initMonths, initAdmin } = require('./index')

exports.initTables = async () => {
    try {
        await initPrice()
        await initRole()
        await initMonths()
        await initAdmin()
    } catch (err) {
        console.log('errrrrr: ', err)
    }
}

