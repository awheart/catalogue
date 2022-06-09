<template>
  <div class="login-bg">
    <NavBar />
    <div class="wrap connexion-wrap">
      <b-icon icon="question" width="60px" height="60px"></b-icon>
      <div class="form-div">
        <div class="login-form connexion-div">
          <h2>Se connecter</h2>
          <form action="" method="post" @submit.prevent="login()">
            <h3>Vous revoilà !</h3>

            <div class="form-inputs">
              <label for="">Email</label>
              <input type="text" class="form-inputs" :class="{ 'is-invalid': errors && errors.email }" v-model="email">
              <div class="invalid-feedback" v-if="errors && errors.email">
                {{ errors.email.msg }}
              </div>
            </div>

            <div class="form-inputs">
              <label for="">Password</label>
              <input type="password" class="form-inputs" :class="{ 'is-invalid': errors && errors.password }"
                v-model="password">
              <div class="invalid-feedback" v-if="errors && errors.password">
                {{ errors.password.msg }}
              </div>
            </div>

            <input type="submit" value="Se connecter" class="catalogue-btn">
          </form>
        </div>
        <div class="register-form connexion-div">
          <h2>S'inscrire</h2>
          <form action="" method="post" @submit.prevent="register()">
            <h3>Rejoingez la communauté</h3>

            <div class="form-inputs">
              <label for="">Nom d'utilisateur</label>
              <input type="text" class="form-inputs" :class="{ 'is-invalid': errors && errors.username }"
                v-model="username">
              <div class="invalid-feedback" v-if="errors && errors.username">
                {{ errors.username.msg }}
              </div>
            </div>

            <div class="form-inputs">
              <label for="">Email</label>
              <input type="email" class="form-inputs" :class="{ 'is-invalid': errors && errors.email }"
                v-model="emailRegister">
              <div class="invalid-feedback" v-if="errors && errors.email">
                {{ errors.email.msg }}
              </div>
            </div>

            <div class="form-inputs">
              <label for="">Password</label>
              <input type="password" class="form-inputs" :class="{ 'is-invalid': errors && errors.password }"
                v-model="passwordRegister">
              <div class="invalid-feedback" v-if="errors && errors.password">
                {{ errors.password.msg }}
              </div>
            </div>

            <input type="submit" value="S'inscrire et se connecter" class="catalogue-btn">

          </form>
        </div>
      </div>
      <nuxt-link class="catalogue-btn" to="/">Retour</nuxt-link>
    </div>
    <FooterMain />
  </div>
</template>

<style scoped>
.form-inputs {
  width: 100%;
}

.form-div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.login-bg {
  position: absolute;
  min-height: 100vh;
  width: 100%;
  background-image: url('https://res.cloudinary.com/catalogue-recipe/image/upload/c_scale,w_auto,q_auto:low,x_20,y_396/v1653928715/tomato_bg.jpg');
}

.connexion-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #FF5700;
}


.connexion-div {
  width: 40%;
  margin: 2% 3%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px 20px;
  border-radius: 15px;
  border: #FF5700 2px solid;
}

h2 {
  text-align: center;
}

h3 {
  border: #FF5700 dotted 2px;
  border-radius: 15px;
  padding: 15px 20px;
  text-align: center;
}

@media screen and (max-width:800px) {
  .form-div {
    flex-direction: column;
  }

  .connexion-div {
    width: 80%;
    margin: 5% auto;
  }
}
</style>

<script>
export default {
  name: 'LoginPage',
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      errors: null,
      username: null,
      login_error: null,
      email: null,
      password: null,
      emailRegister: null,
      passwordRegister: null,
      role: null
    }
  },
  methods: {
    async login() {
      this.errors = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          }
        })
        this.$toast.success(`Vous êtes connecté.`, { duration: 1000 })
      } catch (err) {
        console.log(err)
        this.errors = err.response
      }
    },
    async register() {
      try {
        const registerSuccessful = await this.$axios.post('/api/users/register', {
          username: this.username,
          email: this.emailRegister,
          password: this.passwordRegister
        })
        if (registerSuccessful) {
          this.$toast.success('Inscription réussie, bienvenue !', { duration: 2000 })
          this.$router.push({ path: '/' })
          // log in if successfully registered
          const loginSuccessful = await this.$auth.loginWith('local', {
            data: {
              email: this.emailRegister,
              password: this.passwordRegister
            }
          })
          if (loginSuccessful) setTimeout(() => this.$toast.info('Vous êtes maintenant connecté.', { duration: 2000 }), 2001)
        }
      } catch (errors) {
        const { data } = errors.response
        this.errors = data.errors
      }
    }
  }
}
</script>