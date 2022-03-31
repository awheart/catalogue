<template>
  <div>
    <h1>My Account</h1>

    <hr>

    <div class="card">
      <div class="card-body">
        <h4>Name: {{ this.$auth.user.name }}</h4>
        <h4>Authorization: {{ this.$auth.user.role }}</h4>
        <div class="mb-5"><strong>Email:</strong> {{ this.$auth.user.email }}</div>
        <form action=""
          method="post"
          @submit.prevent="changePassword()">
          <div class="form-group">
              <label for="">Password</label>
              <input type="password" class="form-control"
                :class="{ 'is-invalid': errors && errors.password }"
                v-model="password">
              <div class="invalid-feedback" v-if="errors && errors.password">
                {{ errors.password.msg }}
              </div>
            </div>
            <input type="submit" value="Modifier le mot de passe" class="btn btn-primary mr-3">
        </form>
        <nuxt-link to="/users/logout" class="btn btn-danger">Logout</nuxt-link>
      </div>
    </div>


  </div>
</template>

<script>
const bcrypt = require('bcryptjs')
export default {
  middleware: 'auth',
  data(){
    return{
      errors:null,
      password:null
    }
  },
  methods: {
    async changePassword() {
      if (!this.password) return alert("Vous devez entrer un nouveau de passe pour modifier l'ancien")
      try {
        console.log(this.password)
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(this.password, salt)
        const newPassword = hash
        console.log(hash)
            const response = await this.$axios.patch( '/api/users/' + this.$auth.user._id, {
                password: newPassword
              })
            if(response){
              
                this.$toast.success('Le mot de passe a été modifié.', { duration: 1000 })
            }

        } catch(error) {
            console.log('oopsie')
            if(error.response.data.errors){
                this.errors = error.response.data.errors
            }   
        }
    }
  }
}
</script>