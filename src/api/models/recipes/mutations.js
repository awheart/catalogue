const Recipes = require('./schema')

exports.create = async recipe =>
    Recipes.query()
        .insertGraph(recipe, { allowRefs: true, relate: true })

exports.patch = async inputs =>
    Recipes.query()
        .upsertGraphAndFetch(inputs, { update: true, allowRefs: true, relate: true })

exports.deleteById = async id =>
    Recipes.query()
        .deleteById(id)
