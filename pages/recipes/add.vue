<template>
  <div class="tomato-bg">
    <NavBar />
    <div class="wrap recipe-wrap">
      <h1>Ajouter une recette</h1>
      <form action="" method="post" @submit.prevent="createRecipe()">
        <div class="recipe-image">
          <div class="preview-div">
            <img id="previewImage"
              src="https://res.cloudinary.com/catalogue-recipe/image/upload/v1653911048/logo_transparent_background.png"
              alt="aperçu de l'image">
          </div>
          <input id="uploadImage" class="btn-image" type="file" name="image" @change="previewImage()"
            accept="image/jpeg">
        </div>

        <div class="recipe-header-div">
          <div class="recipe-div">
            <label for="">Titre de la recette</label>
            <input type="text" v-model="title" :class="{ 'is-invalid': errors && errors.title }"
              placeholder="Entrer le nom de la recette">
            <div class="invalid-feedback" v-if="errors && errors.title">
              {{ errors.title.msg }}
            </div>
          </div>
          <div class="recipe-div">
            <label for="">Coût de la recette</label>
            <select v-model="default_price" :class="{ 'is-invalid': errors && errors.title }">
              <option v-for="price in prices" :value="price" :key="price.id">
                {{ price.id }} - {{ price.price_name }}
              </option>
            </select>
            <div class="invalid-feedback" v-if="errors && errors.price">
              {{ errors.price.msg }}
            </div>
          </div>
          <div class="recipe-div">
            <label for="">Rapide description de la recette</label>
            <textarea v-model="description" id="description-textarea" cols="30" rows="5" maxlength="150"
              :class="{ 'is-invalid': errors && errors.description }"
              placeholder="Ceci est une recette qui..."></textarea>

            <div class="invalid-feedback" v-if="errors && errors.description">
              {{ errors.description.msg }}
            </div>
          </div>
          <div class="time-input">
            <div class="div-time">
              <b-icon icon="clock-history" width="50px" height="50px" class="time-icon"></b-icon>
              <input type="number" v-model="prep_time" min="0" class="prep-time"
                :class="{ 'is-invalid': errors && errors.prep_time }" step="0.5">
              <p>Minutes de préparation</p>
              <div class="invalid-feedback" v-if="errors && errors.prep_time">
                {{ errors.prep_time.msg }}
              </div>
            </div>
            <div class="div-time">
              <b-icon icon="hourglass" width="50px" height="50px" class="time-icon"></b-icon>
              <input type="number" v-model="cook_time" min="0" class="cook-time"
                :class="{ 'is-invalid': errors && errors.cook_time }" step="0.5">
              <p>Minutes de cuisson</p>
              <div class="invalid-feedback" v-if="errors && errors.cook_time">
                {{ errors.cook_time.msg }}
              </div>
            </div>

            <div class="div-time">
              <b-icon icon="person" width="50px" height="50px" class="time-icon"></b-icon>
              <input type="number" v-model="nbr_person" class="form-input"
                :class="{ 'is-invalid': errors && errors.nbr_person }">
              <p>Personnes</p>
              <div class="invalid-feedback" v-if="errors && errors.nbr_person">
                {{ errors.nbr_person.msg }}
              </div>
            </div>
          </div>
        </div>
        <div class="add-div ingredient-div">
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
        </div>
        <div class="add-div steps-div">
          <h2>Préparation</h2>
          <draggable v-model="steps" group="steps" handle=".sort-handle">
            <transition-group name="list">
              <div v-for="(input, index) in steps" :key="input">
                Étape {{ index + 1 }}:

                <input type="text" v-model="input.content" placeholder="Décrivez l'étape..."
                  :class="{ 'is-invalid': errors && errors[`steps[${index}].content`] }" />
                <b-icon @click="addStep()" icon="plus-circle" width="17px" height="17px"></b-icon>
                <b-icon v-show="steps.length > 1" @click="removeStep(index)" icon="x-lg" width="15px" height="15px">
                </b-icon>
                <b-icon class="sort-handle" icon="arrow-down-up"></b-icon>
                <div class="invalid-feedback" v-if="errors && errors[`list_ingredient[${index}].content`]">
                  {{ errors[`steps[${index}].content`].msg }}
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>


        <input type="submit" class="catalogue-btn" value="Créer la recette">
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
      title: null,
      description: null,
      image: null,
      prep_time: 0,
      cook_time: 0,
      nbr_person: 0,
      steps: [{ content: null }],
      listIngredient: [{ content: null }],
      prices: null,
      default_price: null,
      user: null
    }
  },
  beforeCreate() {
    if (!this.$auth.loggedIn) {
      this.$router.push({ path: '/users/login' })
    }
  },
  async mounted() {
    const userAuth = await this.$axios.get(`/api/users/user/who?email=${this.$auth.user.email}`)
    this.user = userAuth.data
    const priceFetched = await this.$axios.get('/api/prices')
    this.prices = priceFetched.data
    this.default_price = this.prices[0]
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
          price_id: this.prices.id,
          cook_time: parseFloat(this.cook_time),
          prep_time: parseFloat(this.prep_time),
          nbr_person: parseInt(this.nbr_person)
        })
        if (recipePosted) {
          this.$toast.success('Recette créée avec succès !', { duration: 2000 })
        }
      } catch (errors) {
        this.$toast.error('Erreur durant la création de la recette.', { duration: 2000 })
        if (errors.response.data.errors) this.errors = errors.response.data.errors
      }
      setTimeout(() => document.getElementById('loading').style.display = 'none', 500)
    }
  }
}
</script>

<style scoped>
form {
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
  object-fit: contain;
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