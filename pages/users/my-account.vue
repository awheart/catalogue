<template>
  <div>
    <div class="account-bg">
      <NavBar />
      <div class="wrap account-wrap">
        <h1>Mon compte</h1>

        <div class="account-div">
          <h4>Nom d'utilisateur: {{ username }}</h4>
          <button class="catalogue-btn" @click="$router.push({ path: `/users/update/${User.id}` })">Mettre à jour le
            nom d'utilisateur</button>
          <h4>Email: {{ this.$auth.user.email }}</h4>
          <form action="" method="post" @submit.prevent="changePassword()">
            <div class="form-group">

              <label for="old-password">Votre mot de passe</label>
              <input type="password" name="old-password" class="form-control" :class="{ 'is-invalid': errors }"
                v-model="password" placeholder="mot de passe actuel">
              <div class="invalid-feedback" v-if="errors && errors.password">
                {{ errors.password.msg }}
              </div>

              <label for="new-password">Nouveau mot de passe</label>
              <input type="password" name="new-password" class="form-control" :class="{ 'is-invalid': errors }"
                v-model="newPassword" placeholder="nouveau mot de passe">
              <div class="invalid-feedback" v-if="errors && errors.newPassword">
                {{ errors.newPassword.msg }}
              </div>

              <label for="password-check">Répétez le nouveau mot de passe</label>
              <input type="password" name="password-check" class="form-control" :class="{ 'is-invalid': errors }"
                v-model="passwordCheck" placeholder="nouveau mot de passe">
              <div class="invalid-feedback" v-if="errors && errors.passwordCheck">
                {{ errors.passwordCheck.msg }}
              </div>

            </div>
            <input type="submit" value="Modifier le mot de passe" class="catalogue-btn">
          </form>
        </div>
        <h1>Mes recettes publiées</h1>
        <div class="box-content" v-if="recipes">
          <div class="recipe-cards">
            <div class="item cards" v-for="recipe of recipes" :key="recipe.id"
              @click="$router.push(`/recipes/details/${recipe.id}`)">
              <img class="recipe-bg" :src="recipe.image" alt="image de la recette">
              <h2 class="recipe-title">{{ recipe.title }}</h2>
            </div>
            <div class="item error" v-if="recipes && recipes.length === 0">
              <h1>Vous n'avez pas encore partager vos créations.</h1>
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  </div>
</template>

<style scoped>
.account-div {
  text-align-last: left;
  width: 90%;
  margin: 0 auto;
  border: #FF5700 2px solid;
  border-radius: 15px;
  padding: 15px 20px;
}

.recipe-bg {
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}

.account-wrap {
  display: flex;
  text-align: center;
  flex-direction: column;
}

.recipe-div {
  height: 300px;
  margin: 3% auto;
  width: 90%;
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
  margin: 3vh auto;
  overflow: hidden;
  border-radius: 15px;
  padding: 1px;
}

.recipe-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: minmax(240px, 1fr);
  height: 50vh;
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
  box-sizing: content-box;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

.cards:hover {
  color: #FF5700;
  border: 1px dashed #FF5700;
}

.recipe-title {
  position: absolute;
  width: 93%;
  border-radius: 8px;
  background-color: #FF5700;
  bottom: 0;
  transition: 200ms ease-in-out;
}

.cards:hover .recipe-title {
  background-color: #fff;
}

h1 {
  color: #FF5700;
  text-align: center;
  margin: 2% 0;
}

.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: #FF5700 1px solid;
  grid-column: 1 / 4;
  background-color: #fff;
}

.error h1 {
  color: #FF5700;
}

.account-bg {
  position: absolute;
  min-height: 100vh;
  width: 100%;
  background-image: url('https://res.cloudinary.com/catalogue-recipe/image/upload/c_scale,w_auto,q_auto:low,x_20,y_396/v1653928715/tomato_bg.jpg');
}

@media screen and (max-width:1438px) {
  .error {
    grid-column: 1/3;
  }
}

@media screen and (max-width:960px) {
  .error {
    grid-column: 1/2;
  }
}
</style>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      errors: null,
      password: null,
      username: null,
      newPassword: null,
      passwordCheck: null,
      User: null,
      recipes: null
    }
  },
  async beforeCreate() {
    try {
      const user = await this.$axios.get(`/api/users/user/who?email=${this.$auth.user.email}`)
      const recipes = await this.$axios.get(`/api/recipes`)
      this.recipes = recipes.data
      this.User = user.data
      this.username = user.data.username
      console.log('recipes: ', recipes)
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    async changePassword() {
      this.errors = null
      try {
        const response = await this.$axios.patch('/api/users/' + this.User.id, {
          username: this.username,
          password: this.password,
          newPassword: this.newPassword,
          passwordCheck: this.passwordCheck
        })
        if (response) {
          this.$router.push('/', 1000)
          this.$toast.success('Le mot de passe a été modifié.', { duration: 1000 })
        }
      } catch (err) {
        this.errors = err.response.data.errors
      }
    }
  },
  computed() {

  }
}
</script>