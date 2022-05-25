module.exports = {
    database: require('./migrate'),
    initRole: require('./init_role'),
    initPrice: require('./init_recipe_price'),
    initMonths: require('./init_months')
}