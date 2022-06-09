const Users = require('./schema')
const graphFilter = '[role(selectDefaultRole), recipes(selectDefaultRecipes), comments(selectDefaultComment).[recipe(selectDefaultRecipes)], liked_recipes(selectDefaultRecipes)]'
const modifiers = {
    selectDefaultRecipes(builder) {
        builder.select('recipes.id', 'recipes.title')
    },
    selectDefaultRole(builder) {
        builder.select('role_name')
    },
    selectDefaultComment(builder) {
        builder.select('content', 'id')
    }
}

exports.getAll = async filter => Users.query()
    .select()
    .where(filter)
    .withGraphFetched(graphFilter)
    .modifiers(modifiers)

exports.findById = async id => Users.query()
    .select()
    .findById(id)
    .withGraphFetched(graphFilter)
    .modifiers(modifiers)

exports.findOne = async filter => Users.query()
    .findOne(filter)
    .withGraphFetched(graphFilter)
    .modifiers(modifiers)