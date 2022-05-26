const { mutations: recipeMutations } = require('../models/recipes')
const { getters: stepGetters, mutations: stepMutations } = require('../models/steps')
const { getters: commentGetters, mutations: commentMutations } = require('../models/comments')

exports.deleteRecipeCascade = async (recipeId) => {
    const steps = await stepGetters.getAll({ recipe_id: recipeId })
    if (steps.length !== 0) {
        for (const step of steps) {
            await stepMutations.deleteById(step.id)
        }
    }
    const comments = await commentGetters.getAll({ recipe_id: recipeId })
    if (comments.length !== 0) {
        for (const comment of comments) {
            await commentMutations.deleteById(comment.id)
        }
    }

}