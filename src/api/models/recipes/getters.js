const Recipes = require('./schema')

exports.getAll = async filter =>
    Recipes.query()
        .skipUndefined()
        .select()
        .orderBy('created_at', 'desc')
        .where(filter)
        .withGraphFetched('[price, author(selectDefaultAuthor).[role(selectDefaultRole)], steps(inOrderStep), comments(selectDefaultComment).[author(selectDefaultAuthor)], user_like(selectDefaultAuthor), months, tags, list_ingredient(inOrderList)]')
        .modifiers({
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
        })
exports.findById = async id => Recipes.query().select().findById(id).withGraphFetched('[price, author.[role], steps, comments.[author], user_like, months, tags]')
exports.findOne = async filter => Recipes.query().findOne(filter).withGraphFetched('[price, author.[role], steps, comments.[author], user_like, months, tags]')