<template>
  <div class="tomato-bg">
    <NavBar />
    <div class="wrap recipe-wrap">
      <h1>Ajouter une recette</h1>
      <form action="" method="post" @submit.prevent="createRecipe()">

        <label for="">Nom de la recette</label>
        <input type="text" v-model="title" class="form-control" :class="{ 'is-invalid': errors && errors.title }"
          placeholder="Entrer le nom de la recette">
        <div class="invalid-feedback" v-if="errors && errors.title">
          {{ errors.title.msg }}
        </div>

        <div class="form-group">
          <label for="">Rapide description de la recette</label>
          <textarea v-model="description" id="description-textarea" cols="30" rows="5" maxlength="150"
            class="form-control" :class="{ 'is-invalid': errors && errors.description }"
            placeholder="Ceci est une recette qui..."></textarea>

          <div class="invalid-feedback" v-if="errors && errors.description">
            {{ errors.description.msg }}
          </div>

        </div>


        <input type="number" v-model="prep_time" min="0" class="prep-time"
          :class="{ 'is-invalid': errors && errors.prep_time }" step="0.5">
        <div class="invalid-feedback" v-if="errors && errors.prep_time">
          {{ errors.prep_time.msg }}
        </div>
        <label for="prep_time">Minutes de préparation</label>
        <input type="number" v-model="cook_time" min="0" class="cook-time"
          :class="{ 'is-invalid': errors && errors.cook_time }" step="0.5">
        <div class="invalid-feedback" v-if="errors && errors.cook_time">
          {{ errors.cook_time.msg }}
        </div>
        <label for="cook_time">Minutes de temps de cuisson</label>
        <input type="number" v-model="nbr_person" class="form-control"
          :class="{ 'is-invalid': errors && errors.nbr_person }">
        <div class="invalid-feedback" v-if="errors && errors.nbr_person">
          {{ errors.nbr_person.msg }}
        </div>
        <label for=" nbr_person">Personnes</label>

        <h2>Préparation</h2>
        <div class="invalid-feedback" v-if="errors && stepsErrors">
          <div v-for="(error, index) in errors" :key="index">
            {{ steps.msg }}
          </div>
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

              <input type="text" v-model="input.content" placeholder="Entrez un ingrédient"
                :class="{ 'is-invalid': errors && errors[`list_ingredient[${index}].content`] }" />


              <b-icon @click="addIngredient()" icon="plus-circle" width="17px" height="17px"></b-icon>
              <b-icon v-show="listIngredient.length > 1" @click="removeIngredient(index)" icon="x-lg" width="15px"
                height="15px">
              </b-icon>
              <b-icon class="sort-handle" icon="arrow-down-up"></b-icon>
              <div class="invalid-feedback" v-if="errors && errors[`list_ingredient[${index}].content`]">
                {{ errors[`list_ingredient[${index}].content`].msg }}
              </div>
            </div>
          </transition-group>
        </draggable>

        <label for="image">Image de la recette</label>
        <input id="uploadImage" type="file" name="image" @change="previewImage()" accept="image/jpeg">
        <img id="previewImage" alt="pré vision de l'image">

        <input type="submit" value="Créer la recette">
      </form>

      <div id="loading">
        <div class="container">
          <h1>Création en cours</h1>
          <div class="dot-spin"></div>
        </div>
      </div>

    </div>
    <FooterMain />
  </div>
</template>

<style scoped>
#loading {
  position: absolute;
  background-color: #00000670;
  top: 0;
  left: 0;
  z-index: 50;
  display: none;
  width: 100%;
  height: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.dot-spin {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: transparent;
  color: transparent;
  box-shadow: 0 -18px 0 0 #FF5700, 12.72984px -12.72984px 0 0 #FF5700, 18px 0 0 0 #FF5700, 12.72984px 12.72984px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 0 rgba(152, 128, 255, 0), -18px 0 0 0 rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 0 rgba(152, 128, 255, 0);
  animation: dotSpin 1.5s infinite linear;
}

@keyframes dotSpin {

  0%,
  100% {
    box-shadow: 0 -18px 0 0 #FF5700, 12.72984px -12.72984px 0 0 #FF5700, 18px 0 0 0 #FF5700, 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
  }

  12.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 0 #FF5700, 18px 0 0 0 #FF5700, 12.72984px 12.72984px 0 0 #FF5700, 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
  }

  25% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0 #FF5700, 12.72984px 12.72984px 0 0 #FF5700, 0 18px 0 0 #FF5700, -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
  }

  37.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 0 #FF5700, 0 18px 0 0 #FF5700, -12.72984px 12.72984px 0 0 #FF5700, -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
  }

  50% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0 #FF5700, -12.72984px 12.72984px 0 0 #FF5700, -18px 0 0 0 #FF5700, -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
  }

  62.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 0 #FF5700, -18px 0 0 0 #FF5700, -12.72984px -12.72984px 0 0 #FF5700;
  }

  75% {
    box-shadow: 0 -18px 0 0 #FF5700, 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 0 #FF5700, -12.72984px -12.72984px 0 0 #FF5700;
  }

  87.5% {
    box-shadow: 0 -18px 0 0 #FF5700, 12.72984px -12.72984px 0 0 #FF5700, 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 0 #FF5700;
  }
}

#loading .dot-spin {
  margin: 0 3vw;
}

#loading .container {
  display: flex;
  flex: wrap;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 15px;
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
      errors: null,
      stepsErrors: null,
      listIngredientErrors: null,
      title: null,
      description: null,
      image: null,
      prep_time: null,
      cook_time: null,
      nbr_person: null,
      steps: [{ content: null }],
      listIngredient: [{ content: null }],
      user: null
    }
  },
  beforeCreate() {
    if (!this.$auth.loggedIn) {
      this.$router.push({ path: '/users/login' })
      this.$toast.info('Vous devez être connecter pour accéder à cette page.', { duration: 2000 })
    }
  },
  async afterCreate() {
    const userAuth = await this.$axios.get(`/api/users/user/who?email=${this.$auth.user.email}`)
    this.user = userAuth.data
  },
  methods: {
    previewImage() {
      const reader = new FileReader()
      reader.readAsDataURL(document.getElementById('uploadImage').files[0])
      reader.onload = previewEvent => {
        document.getElementById('previewImage').src = previewEvent.target.result
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
      if (this.cook_time == null) return { ...this.errors, ...{ cook_time: { msg: 'Le champs temps de cuisson ne peut être vide.' } } }
      document.getElementById('loading').style.display = 'flex'
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
          image: this.image,
          cook_time: parseFloat(this.cook_time),
          prep_time: parseFloat(this.prep_time),
          nbr_person: parseInt(this.nbr_person)
        })
        if (recipePosted) {
          this.$toast.success('Recette créée avec succès !', { duration: 2000 })
        }
      } catch (errors) {
        this.$toast.error('Erreur durant la création de la recette.', { duration: 2000 })
        const { data } = errors.response
        this.errors = data.errors
      }
      setTimeout(() => document.getElementById('loading').style.display = 'none', 500)
    }
  }
}
</script>