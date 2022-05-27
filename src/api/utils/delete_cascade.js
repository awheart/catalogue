const { getters: stepGetters, mutations: stepMutations } = require('../models/steps')
const { getters: tagRecipeGetters, mutations: tagRecipeMutations } = require('../models/tag_recipe')
const { getters: listIngredientGetters, mutations: listIngredientMutations } = require('../models/list_ingredient')
const { getters: monthOfConsumptionGetters, mutations: monthOfConsumptionMutations } = require('../models/month_of_consumption')
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
    const tagsRecipe = await tagRecipeGetters.getAll({ recipe_id: recipeId })
    if (tagsRecipe.length !== 0) {
        for (const tagRecipe of tagsRecipe) {
            await tagRecipeMutations.deleteById(tagRecipe.id)
        }
    }
    const listsIngredient = await listIngredientGetters.getAll({ recipe_id: recipeId })
    if (listsIngredient.length !== 0) {
        for (const ingredient of listsIngredient) {
            await listIngredientMutations.deleteById(ingredient.id)
        }
    }
    const moc = await monthOfConsumptionGetters.getAll({ recipe_id: recipeId })
    if (moc.length !== 0) {
        for (const month of moc) {
            await monthOfConsumptionMutations.deleteById(month.id)
        }
    }
}