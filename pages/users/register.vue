<template>
  <div>
    <h1>Register</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="register()">

          <div class="form-group">
            <label for="">Nom d'utilisateur</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.username }"
              v-model="username" required>
            <div class="invalid-feedback" v-if="errors && errors.username">
              {{ errors.username.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email" required>
            <div class="invalid-feedback" v-if="errors && errors.email">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password" required>
            <div class="invalid-feedback" v-if="errors && errors.password">
              {{ errors.password.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Rôle (optional)</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.role }"
              v-model="role" placeholder="utilisateur">
            <div class="invalid-feedback" v-if="errors && errors.role">
              {{ errors.role.msg }}
            </div>
        </div>

          <input type="submit" value="S'inscrire et se connecter" class="btn btn-primary mr-3">
          <nuxt-link to="/" class="btn btn-secondary mr-3">Cancel</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  middleware: 'auth',
  auth: 'guest',
  data(){
    return{
      errors:null,
      username:null,
      email:null,
      role: null,
      password:null,
      status:false
    }
  },
  methods:{
    async register(){
      const registerSuccessful = await this.$axios.post('/api/users/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.role,
        })
        if (registerSuccessful) {
          this.$toast.success('Successfully registered and logged in!', { duration: 2000 })
          this.$router.push({ path: '/' })
          // log in if successfully registered
          await this.$auth.loginWith('local', {
              data: {
                email: this.email,
                password: this.password
              }
            })
          }
        }  
    }
}
</script>