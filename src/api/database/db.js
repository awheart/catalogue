const { initRole, initPrice, initMonths } = require('./index')

exports.initTables = async () => {
    try {
        await initPrice()
        await initRole()
        await initMonths()
    } catch (err) {
        console.log('errrrrr: ', err)
    }
}

