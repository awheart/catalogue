<template>
  <div class="tomato-bg">
    <NavBar />
    <div class="wrap recipe-wrap">
      <h1>{{ title }}</h1>
      <div class="form">

        <div class="recipe-image">
          <div class="preview-div">
            <img id="previewImage" :src="image" alt="aperçu de l'image">
          </div>
        </div>

        <div class="recipe-header-div">
          <div class="recipe-div">
            <label for="">Auteur de la recette</label>
            <input v-model="author" type="text" disabled />
          </div>
          <div class="recipe-div">
            <label for="">Description de la recette</label>
            <textarea v-model="description" id="description-textarea" cols="30" rows="5" disabled></textarea>
          </div>
          <div class="time-input">
            <div class="div-time">
              <b-icon icon="clock-history" width="50px" height="50px" class="time-icon"></b-icon>
              <input type="number" v-model="prep_time" min="0" class="prep-time" disabled>
              <p>Minutes de préparation</p>
            </div>
            <div class="div-time">
              <b-icon icon="hourglass" width="50px" height="50px" class="time-icon"></b-icon>
              <input type="number" v-model="cook_time" min="0" class="cook-time" disabled>
              <p>Minutes de cuisson</p>
            </div>

            <div class="div-time">
              <b-icon icon="person" width="50px" height="50px" class="time-icon"></b-icon>
              <input type="number" v-model="nbr_person" class="form-input" disabled>
              <p>Personnes</p>
            </div>
          </div>
        </div>
        <div class="add-div ingredient-div">
          <h2>Ingrédients</h2>
          <div v-for="(input, index) in list_ingredient" :key="input">
            Ingrédient {{ index + 1 }}:
            <input type="text" v-model="input.content" disabled />
          </div>
        </div>
        <div class="add-div steps-div">
          <h2>Préparation</h2>
          <div v-for="(input, index) in steps" :key="input">
            Étape {{ index + 1 }}:
            <input type="text" v-model="input.content" disabled />
          </div>
        </div>
        <button v-if="author_id == user_id" class="catalogue-btn"
          @click="$router.push({ path: `/recipes/update/${$route.params.id}` })">Modifier la recette</button>
      </div>
    </div>
    <FooterMain />
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  border: #FF5700 2px solid;
  text-align: center;
  width: 90%;
  margin: 1vh auto;
  padding: 15px 20px;
  border-radius: 15px;
}

.recipe-div {
  display: flex;
  flex-direction: column;
}

.add-div {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 3% 2%;
  text-align: left;
}

.div-time {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.time-input {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}

.time-icon {
  margin: 20px 0;
}

input[type="number"] {
  width: 65px;
}

input[type="file"] {
  width: 75%;
}

.recipe-image {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3% 2%;
  text-align: center;
}

.recipe-header-div {
  width: 40%;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 3% 2%;
  text-align: center;
}

.preview-div {
  border: #FF5700 1px solid;
  height: 400px;
  width: 100%;
  margin-bottom: 1%;
  border-radius: 15px;
}

h1,
h2 {
  color: #FF5700;
}

.recipe-wrap {
  position: relative;
  display: flex;
  text-align: center;
  flex-direction: column;
}

#previewImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

.list-move {
  transition: all 0.3s;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media screen and (max-width:800px) {
  form {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .recipe-image,
  .recipe-header-div,
  .recipe-div,
  .add-div,
  .ingredient-div {
    width: 100%;
  }
}
</style>

<script>
export default {
  name: 'RecipeDetail',
  data() {
    return {
      errors: null,
      recipe_id: null,
      recipe: null,
      title: null,
      description: null,
      image: null,
      nbr_person: null,
      cook_time: null,
      prep_time: null,
      steps: null,
      list_ingredient: null,
      author: null,
      author_id: null,
      user_id: null
    }
  },
  async mounted() {
    const userAuth = await this.$axios.get(`/api/users/user/who?email=${this.$auth.user.email}`)
    console.log('user: ', userAuth)
    this.user_id = userAuth.data.id
    const recipeFetch = await this.$axios.get(`/api/recipes/${this.$route.params.id}`)
    console.log('recipe: ', recipeFetch.data.author.id)
    this.recipe = recipeFetch.data
    this.recipe_id = this.recipe.id
    this.title = this.recipe.title
    this.description = this.recipe.description
    this.image = this.recipe.image
    this.prep_time = this.recipe.prep_time
    this.cook_time = this.recipe.cook_time
    this.nbr_person = this.recipe.nbr_person
    this.steps = this.recipe.steps
    this.list_ingredient = this.recipe.list_ingredient
    this.author_id = this.recipe.author.id
    this.author = this.recipe.author.username
    console.log(this.author_id, this.user_id)
  }
}
</script>