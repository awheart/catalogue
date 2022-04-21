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
            <label for="">Nom de l'utilisateur</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.username }"
              v-model="username">
            <div class="invalid-feedback" v-if="errors && errors.username">
              {{ errors.username.msg }}
            </div>
          </div>
          <input type="submit" value="Submit" class="btn btn-primary mr-3">
          <nuxt-link :to="'/users/' + $route.params.id + '/details'" class="btn btn-secondary mr-3">Annuler</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UpdateUser',
    middleware: 'auth',
  async asyncData(context){
    const {data} = await context.$axios.get( '/api/users/' + context.route.params.id)
    return {
      user: data
    }
  },
  data(){
    return{
      errors: null,
      username:null
    }
  },
  mounted(){
    this.fillFormData()
  },
  methods: {
    fillFormData(){
      this.username = this.user.username
    },
    async submitForm(){
        try {
            const data = { username: this.username }
            await this.$axios.patch( '/api/users/admin/' + this.$route.params.id, data)
            this.$toast.success('updated', { duration: 1000 })
            this.$router.push( {path:  '/users/dashboard/', params:{ updated:'yes', id: this.$route.params.id }})
        } catch (error) {
            if(error.response.data.errors) this.errors = error.response.data.errors
        }
    }
    }
}
</script>