<template>
  <div class="tomato-bg">
    <NavBar />
    <div class="wrap">
      <h1>Ajouter une recette</h1>
      <form action="" method="POST" @submit.prevent="createRecipe()">
        <label for="title">Nom de la recette</label>
        <input type="text" name="title" v-model="title" :class="{ 'is-invalid': errors && errors.title }"
          placeholder="Entrer le nom de la recette">
        <label for="description">Rapide description de la recette</label>
        <textarea name="description" v-model="description" id="description-textarea" cols="30" rows="5" maxlength="150"
          :class="{ 'is-invalid': errors && errors.description }"></textarea>
        <input type="number" name="prep_time" min="0" :class="{ 'is-invalid': errors && errors.prep_time }">
        <label for="prep_time">Minutes de préparation</label>
        <input type="number" name="cook_time" min="0" :class="{ 'is-invalid': errors && errors.cooki_time }">
        <label for="cook_time">Minutes de temps de cuisson</label>
        <input type="number" name="nbr_person" :class="{ 'is-invalid': errors && errors.nbr_person }">
        <label for=" nbr_person">Personnes</label>

        <h2>Préparation</h2>
        <div class="tag-errors" v-if="errors && errors.step">
          <p class="error-text">{{ errors.step }}</p>
        </div>


        <draggable v-model="steps" group="steps" handle=".sort-handle">
          <transition-group name="list">
            <div v-for="(input, index) in steps" :key="input">
              Étape {{ index + 1 }}:
              <input type="text" v-model="input.content" placeholder="Décrivez l'étape..." />
              <b-icon @click="addStep()" icon="plus-circle" width="17px" height="17px"></b-icon>
              <b-icon v-show="steps.length > 1" @click="removeStep(index)" icon="x-lg" width="15px" height="15px">
              </b-icon>
              <b-icon class="sort-handle" icon="arrow-down-up"></b-icon>
            </div>
          </transition-group>
        </draggable>

        <h2>Ingrédients</h2>
        <draggable v-model="listIngredient" group="ingredients" handle=".sort-handle">
          <transition-group name="list">
            <div v-for="(input, index) in listIngredient" :key="input">
              Ingrédient {{ index + 1 }}:
              <input type="text" v-model="input.content" placeholder="Entrez un ingrédient" />
              <b-icon @click="addIngredient()" icon="plus-circle" width="17px" height="17px"></b-icon>
              <b-icon v-show="listIngredient.length > 1" @click="removeIngredient(index)" icon="x-lg" width="15px"
                height="15px">
              </b-icon>
              <b-icon class="sort-handle" icon="arrow-down-up"></b-icon>
            </div>
          </transition-group>
        </draggable>

        <label for="image">Image de la recette</label>
        <input id="uploadImage" type="file" name="image" @change="previewImage()" accept="image/jpeg">
        <img id="previewImage" alt="pré vision de l'image">

        <input type="submit" value="Créer la recette">
      </form>
    </div>
    <FooterMain />
  </div>
</template>

<style scoped>
#previewImage {
  width: 15vw;
  height: auto;
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
</style>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  name: 'RecipeAdd',
  data() {
    return {
      errors: [],
      title: null,
      description: null,
      image: null,
      steps: [{ content: null }],
      user: null,
      listIngredient: [{ content: null }]
    }
  },
  beforeCreate() {
    if (!this.$auth.loggedIn) this.$router.push({ path: '/users/login' })
  },
  async mounted() {
    const userAuth = await this.$axios.get(`/api/users/user/who?email=${this.$auth.user.email}`)
    this.user = userAuth.data
  },
  methods: {
    previewImage() {
      const reader = new FileReader()
      reader.readAsDataURL(document.getElementById('uploadImage').files[0])
      reader.onload = previewEvent => {
        document.getElementById('previewImage').src = previewEvent.target.result
        console.log('image: ', previewEvent.target.result)
        this.image = previewEvent.target.result
      }
    },
    addStep() {
      this.steps.push({ content: null })
    },
    addIngredient() {
      this.listIngredient.push({ content: null })
    },
    removeStep(index) {
      return this.steps.splice(index, 1)
    },
    removeIngredient(index) {
      return this.listIngredient.splice(index, 1)
    },
    async createRecipe() {
      try {
        const newSteps = this.steps.map((step, index) => {
          return { ...step, ...{ step_order: index + 1 } }
        })
        const newIngredient = this.listIngredient.map((ingredient, index) => {
          return { ...ingredient, ...{ inlist_order: index + 1 } }
        })
        const recipePosted = await this.$axios.post('/api/recipes', {
          title: this.title,
          description: this.description,
          steps: newSteps,
          list_ingredient: newIngredient,
          user_id: this.user.id,
          image: this.image
        })
        if (recipePosted) {
          this.$toast.success('Recette créée avec succès !', { duration: 2000 })
        }
      } catch (err) {
        this.errors = err.response.data
      }


    }
  }
}
</script>