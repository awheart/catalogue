<template>
  <div>
    <h1>Update User</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

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
            <label for="">Role</label>
            <input type='text' class="form-control"
              :class="{ 'is-invalid': errors && errors.role }"
              v-model="role">
            <div class="invalid-feedback" v-if="errors && errors.role">
              {{ errors.role.msg }}
            </div>
          </div>
          <input type="submit" value="Submit" class="btn btn-primary mr-3">
          <nuxt-link :to="'/users/' + $route.params.id + '/user'" class="btn btn-secondary mr-3">Annuler</nuxt-link>

        </form>
          <button @click="fillFormData">log</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UpdateUser',
    middleware: 'auth',
  async asyncData(context){
    const {data} = await context.$axios.get('/api/users/' + context.route.params.id)
    return {
      user : data
    }
  },
  data(){
    return{
      errors:null,
      name:null,
      email:null,
      role:null
    }
  },
  mounted(){
    this.fillFormData()
    console.log('mounted')
  },
  methods:{
    fillFormData(){
      this.name = this.user.name
      this.email = this.user.email
      this.role = this.user.role
    },
    async submitForm(){
        try {
            const response = await this.$axios.patch( '/api/users/' + this.$route.params.id + '/admin', {
                name: this.name,
                email: this.email,
                role: this.role
              })
            if(response){
                this.$toast.success('updated', { duration: 1000 })
                this.$router.push({ path:'/users/dashboard', params:{ updated:'yes', id: this.$route.params.id } })
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