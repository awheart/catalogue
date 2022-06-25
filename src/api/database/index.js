module.exports = {
    database: require('./migrate'),
    initRole: require('./init_role'),
    initPrice: require('./init_price'),
    initMonths: require('./init_months'),
    initAdmin: require('./init_admin')
}