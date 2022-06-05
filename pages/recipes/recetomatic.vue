<template>
  <div class="recetomatic-bg">
    <NavBar />
    <div class="wrap recetomatic-wrap">
      <h1>Recet'omatic</h1>
      <div class="tool-info">
        <div class="tool-icon">
          <b-icon icon='question' width="36px" height="38px"></b-icon>
        </div>
        <p class="tool-text">
          Vous avez des restes, des ingrédients et pas d'idées de recettes ? <br> Le <strong>Recet'omatic</strong> est
          là pour vous !
          Entrez les ingrédients que vous avez ou voulez utiliser et il s'occupe de vous trouver des recettes
          contenant les ingrédients listés; vous aurez également les recettes avec ces ingrédients même
          s'il y en a d'autre ! <br>
          Alors à vos claviers, prêt, feu, cuisinez !
        </p>
      </div>
      <div class="tool-search">
        <form action="" class="tool-form" autocomplete="off" method="post" @submit.prevent="recetomatic()">
          <label for="total_time">Combien de minutes avez vous pour cuisiner?</label>
          <input type="number" name="total_time" v-model="timeInput" min=0 max=1000>
          <input type="search" v-model="tagInput"
            placeholder="Entrer des ingrédients que vous souhaitez dans votre recette">
          <div class="search-result">
            <div class="inlist-tag" v-for="tags in filteredList" :key="tags.tag_name" @click="addTag(tags)">
              <p class="tag-name">{{ tags.tag_name }}</p>
            </div>
            <div class="tag-errors" v-if="errors && errors.message">
              <p class="error-text">{{ errors.message }}</p>
            </div>
          </div>
          <h3>Vos ingrédients sélectionnés :</h3>
          <div class="selected-tags" v-for="tag of selectedTags" :key="tag.tag_name">
            <ul>
              <li>
                {{ tag }}
                <a class="del-tag">
                  <b-icon @click="removeTag(tag)" icon="x-lg" width="15px" height="15px"></b-icon>
                </a>
              </li>
            </ul>
          </div>
          <button class="tool-btn" type="submit">Je cherche une recette</button>
        </form>
        <div class="box-content" v-if="recipes">
          <div class="recipe-cards">
            <div class="item cards" v-for="recipe of recipes" :key="recipe.id"
              @click="$router.push(`/recipes/details/${recipe.id}`)">
              <img class="recipe-bg" :src="recipe.image" alt="image de la recette">
              <h2 class="recipe-title">{{ recipe.title }}</h2>
            </div>
            <div class="item error" v-if="recipes && recipes.length === 0">
              <h1>Pas de recettes trouvées.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterMain />
  </div>
</template>

<script>
export default {
  name: 'RecetomaticTool',
  data() {
    return {
      tags: [],
      selectedTags: [],
      recipes: null,
      timeInput: 5,
      tagInput: null,
      errors: null
    }
  },
  async mounted() {
    try {
      const tagsData = await this.$axios.get(`/api/tags`)
      this.tags = tagsData.data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    addTag(tags) {
      for (const selectedTag of this.selectedTags) {
        if (tags.tag_name === selectedTag.tag_name) {
          this.tagInput = ''
          return
        }
      }
      this.tagInput = ''
      return this.selectedTags.push(tags.tag_name)
    },
    removeTag(tags) {
      for (let i = 0; i < this.selectedTags.length; i++) {
        if (tags.tag_name === this.selectedTags[i].tag_name) return this.selectedTags.splice(i, 1)
      }
    },
    async recetomatic() {
      this.errors = null
      const { data: recipeFetched } = await this.$axios.get(`/api/recipes`)
      const recipeFiltered = recipeFetched.filter(recipe => recipe.total_time < this.timeInput)

      const newRecipes = []
      if (!this.tagInput) this.errors = { message: 'Pour chercher une recette, sélectionnez d\'abord un ou plusieurs ingrédients !' }
      for (const recipe of recipeFiltered) {
        const tags = recipe.tags
        for (const { tag_name } of tags) {
          if (newRecipes.includes(recipe)) break
          if (this.selectedTags.includes(tag_name)) newRecipes.push(recipe)
        }
      }
      this.recipes = newRecipes
    }
  },
  computed: {
    filteredList() {
      if (!this.tagInput) return []
      return this.tags.filter(tag =>
        tag.tag_name.toLowerCase().includes(this.tagInput.toLowerCase())
      )
    }
  }
}
</script>

<style scoped>
.recipe-bg {
  display: flex;
  flex-direction: column;
  max-height: 45%;
  width: auto;
}

.inlist-tag {
  display: inline-block;
  border: #FF5700 1px solid;
  background-color: #fff;
  padding: 2px 4px;
  border-radius: 8px;
  margin: 1px;
}

.inlist-tag:hover {
  background-color: #FF5700;
}

.inlist-tag:hover p {
  color: #fff;
}

.inlist-tag p {
  color: #FF5700;
  margin: 0;
}

.recipe-title {
  position: absolute;
  width: 93%;
  border-radius: 8px;
  background-color: #FF5700;
  bottom: 0;
  transition: 200ms ease-in-out;
}

ul {
  list-style: none;
}

input[type=search] {
  display: block;
  width: 80%;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../../src/assets/img/search.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 80%;
  margin: 0 auto 10px auto;
  padding: 7px 10px;
  color: white;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.box-content {
  position: relative;
  max-height: 100%;
  width: 51vw;
  border: 2px solid #FF5700;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
  padding: 1px;
}

.recipe-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: minmax(240px, 1fr);
  height: 34vh;
  width: 50vw;
  overflow-x: scroll;
  border-radius: 15px;
  align-items: center;
  text-align: center;
}

.cards {
  background-color: rgb(187, 183, 204);
  position: relative;
  color: #fff;
  border: 1px solid #FF5700;
  margin: 2vh;
  height: 25vh;
  box-sizing: content-box;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

.cards:hover {
  color: #FF5700;
  border: 1px dashed #FF5700;
}

.cards:hover .recipe-title {
  background-color: #fff;
}

.error {
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2 / 4;
  background-color: red;
}

.error h1 {
  color: #fff;
}

.selected-tags {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.inlist-tag,
.del-tag {
  cursor: pointer;
}

.del-tag {
  color: #FF5700;
}

.recetomatic-bg {
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://res.cloudinary.com/catalogue-recipe/image/upload//v1653928693/tool_bg.jpg');
  background-size: cover;
}

h1,
h3 {
  margin: 1vh 0;
  color: #FF5700;
}

.recetomatic-wrap {
  display: flex;
  text-align: center;
  flex-direction: column;
}

.tool-info {
  position: relative;
  width: 80%;
  margin: 1vh auto;
}

.tool-icon {
  position: relative;
  z-index: 1;
  top: 20px;
  display: flex;
  justify-content: center;
  background-color: #FF5700;
  width: 80px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  color: #fff;
}

.tool-text {
  position: relative;
  overflow: hidden;
  z-index: 50;
  font-size: 18px;
  border: 2px solid #FF5700;
  border-radius: 15px;
  background-color: #fff;
  color: #FF5700;
  padding: 25px;
}
</style>