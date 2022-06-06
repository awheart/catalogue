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
        <textarea name="description" id="description-textarea" cols="30" rows="5" maxlength="150"></textarea>
        <input type="number" name="prep_time" min="0">
        <label for="prep_time">Minutes de préparation</label>
        <input type="number" name="cook_time" min="0">
        <label for="cook_time">Minutes de temps de cuisson</label>
        <input type="number" name="nbr_person">
        <label for="nbr_person">Personnes</label>

        <h2>Préparation</h2>
        <div class="tag-errors" v-if="errors && errors.step">
          <p class="error-text">{{ errors.step }}</p>
        </div>


        <draggable v-model="steps" group="steps" handle=".sort-handle">
          <transition-group name="list">
            <div v-for="(input, index) in steps" :key="input">
              Étape: {{ index + 1 }}
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
              Ingrédient: {{ index + 1 }}
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
        <input id="uploadImage" type="file" name="image" @change="previewImage()">
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
      steps: [{ content: '' }],
      listIngredient: [{ content: '' }],
      stepsInput: [{ content: '' }],
      listIngredientInput: [{ content: '' }]
    }
  },
  beforeCreate() {
    if (!this.$auth.loggedIn) this.$router.push({ path: '/users/login' })
  },
  methods: {
    previewImage() {
      const reader = new FileReader()
      const url = reader.readAsDataURL(document.getElementById('uploadImage').files[0])
      console.log('url: ', url)
      reader.onload = previewEvent => {
        document.getElementById('previewImage').src = previewEvent.target.result
      }
    },
    addStep() {
      this.steps.push({ content: '' })
    },
    addIngredient() {
      this.listIngredient.push({ content: '' })
    },
    removeStep(index) {
      return this.steps.splice(index, 1)
    },
    removeIngredient(index) {
      return this.listIngredient.splice(index, 1)
    }
  }
}
</script>