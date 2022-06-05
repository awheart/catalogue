const Recipes = require('./schema')
const graphFilter = '[price, author(selectDefaultAuthor).[role(selectDefaultRole)], steps(inOrderStep), comments(selectDefaultComment).[author(selectDefaultAuthor)], likes(selectDefaultAuthor), months, tags, list_ingredient(inOrderList)]'
const modifiers = {
    inOrderStep(builder) {
        builder.select('content', 'id').orderBy('step_order', 'asc')
    },
    inOrderList(builder) {
        builder.select('content', 'id').orderBy('inlist_order', 'asc')
    },
    selectDefaultAuthor(builder) {
        builder.select('users.id', 'users.username')
    },
    selectDefaultRole(builder) {
        builder.select('role_name')
    },
    selectDefaultComment(builder) {
        builder.select('content', 'id')
    }
}

exports.getAll = async filter => Recipes.query()
    .skipUndefined()
    .select()
    .where(filter)
    .withGraphFetched(graphFilter)
    .modifiers(modifiers)

exports.findById = async id => Recipes.query()
    .select()
    .findById(id)
    .withGraphFetched(graphFilter)
    .modifiers(modifiers)

exports.findOne = async filter => Recipes.query()
    .findOne(filter)
    .withGraphFetched(graphFilter)
    .modifiers(modifiers)