<template>
  <div class="book-bg">
    <NavBar />
    <div class="wrap search-wrap">
      <input type="search" v-model="input" placeholder="Chercher une recette..." />
      <h1>Toutes les recettes</h1>
      <div class="box-content">
        <div class="recipe-cards">
          <div class="item cards" v-for="recipes in filteredList" :key="recipes.id"
            @click="$router.push(`/recipes/details/${recipes.id}`)">
            <img class="recipe-bg" :src="recipes.image" alt="image de la recette">
            <h2 class="recipe-title">{{ recipes.title }}</h2>
          </div>
          <div class="item error" v-if="recipes.length === 0">
            <h1>Pas de recettes trouvées.</h1>
            <button class="catalogue-btn" @click="$router.push({ path: `/recipes/add` })">Partager vos idées
              ici!</button>
          </div>
        </div>
      </div>
    </div>
    <FooterMain />
  </div>
</template>

<script>
export default {
  name: 'RecipesIndex',
  data() {
    return {
      recipes: [],
      input: ''
    }
  },
  async mounted() {
    try {
      const recipesData = await this.$axios.get(`/api/recipes?is_published=true`)
      this.recipes = recipesData.data
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    filteredList() {
      if (this.recipes.length == 0) return
      return this.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(this.input.toLowerCase())
      )
    }
  }
}
</script>

<style scoped>
.book-bg {
  top: 0;
  position: absolute;
  height: min-content;
  width: 100%;
  background-image: url('https://res.cloudinary.com/catalogue-recipe/image/upload/v1653928693/recipe_bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

h1 {
  color: #FF5700;
}

.recipe-bg {
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}

.recipe-title {
  position: absolute;
  width: 93%;
  border-radius: 8px;
  background-color: #FF5700;
  bottom: 0;
  transition: 200ms ease-in-out;
}

.search-wrap {
  display: flex;
  text-align: center;
  flex-direction: column;
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
  width: 50vw;
  border: 2px solid #FF5700;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
  padding: 5px;
}

.recipe-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  height: 60vh;
  width: 49vw;
  overflow-y: scroll;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: #FF5700 1px solid;
  grid-column: 2 / 4;
  background-color: #fff;
}

.error h1 {
  color: #FF5700;
}

@media screen and (max-width: 1816px) {
  .error {
    grid-column: 1/4;
  }
}
</style>