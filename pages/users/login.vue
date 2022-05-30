<template>
  <div>
    <h1>Login</h1>
    <hr>

    <div class="alert alert-success" v-if="$route.params.registered == 'yes'">You have registered successfully</div>

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="login()">

        <div class="text-danger" v-if="errors && errors.msg">{{ errors.msg }}</div>

          <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control" :class="{ 'is-invalid': errors && errors.email }" v-model="email">
            <div class="invalid-feedback" v-if="errors && errors.email">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" :class="{ 'is-invalid': errors && errors.password }"
              v-model="password">
            <div class="invalid-feedback" v-if="errors && errors.password">
              {{ errors.password.msg }}
            </div>
          </div>

          <div class="alert alert-danger" v-if="login_error">{{ login_error }}</div>

          <input type="submit" value="Login" class="btn btn-primary mr-3">
          <nuxt-link to="/" class="btn btn-secondary mr-3">Cancel</nuxt-link>
          <nuxt-link to="/users/register">S'inscrire</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      errors: null,
      login_error: null,
      email: null,
      password: null,
      role: null,
      id: null
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
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>