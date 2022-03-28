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
            <label for="">Name</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
              v-model="name">
            <div class="invalid-feedback" v-if="errors && errors.name">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email">
            <div class="invalid-feedback" v-if="errors && errors.email">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password">
            <div class="invalid-feedback" v-if="errors && errors.password">
              {{ errors.password.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Admin access (optional)</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.role }"
              v-model="role">
            <div class="invalid-feedback" v-if="errors && errors.role">
              {{ errors.role.msg }}
            </div>
        </div>

          <input type="submit" value="Register" class="btn btn-primary mr-3">
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
      name:null,
      email:null,
      password:null,
      status:false,
    }
  },
  methods:{
    register(){
      const registerSuccessful = this.$axios.post( '/api/users/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        })
        if (registerSuccessful) {
          this.$toast.success('Successfully registered !')
          if(registerSuccessful.data._id){
            this.$router.push({ name:'user-login', params:{ registered:'yes' } })
            // log in if successfully registered
            this.$auth.loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password
                }
              })
              .catch( (error) => {
                console.log(error)
              })
          }
        }
          
        
    }
  }
}
</script>