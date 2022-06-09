<template>
  <div>
    <div class="tomato-bg">
      <NavBar />
      <div class="wrap">
        <h1>Mis à jour du nom d'utilisateur</h1>

        <div class="row">
          <div class="col-md-6">
            <form action="" method="post" @submit.prevent="submitForm()">

              <div class="form-group">
                <label for="">Nom d'utilisateur</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors && errors.username }"
                  v-model="username">
                <div class="invalid-feedback" v-if="errors && errors.username">
                  {{ errors.username.msg }}
                </div>
              </div>
              <input type="submit" value="Valider" class="btn btn-primary mr-3">
              <nuxt-link :to="`/users/details/${$route.params.id}`" class="btn btn-secondary mr-3">Annuler
              </nuxt-link>
            </form>
          </div>
        </div>
      </div>
    </div>
    <FooterMain />
  </div>
</template>

<script>
export default {
  name: 'UpdateUser',
  middleware: 'auth',
  async asyncData(context) {
    const { data } = await context.$axios.get('/api/users/' + context.route.params.id)
    return {
      user: data
    }
  },
  data() {
    return {
      errors: null,
      username: null
    }
  },
  mounted() {
    this.fillFormData()
  },
  methods: {
    fillFormData() {
      this.username = this.user.username
    },
    async submitForm() {
      try {
        const data = { username: this.username }
        const userUpdated = await this.$axios.patch('/api/users/' + this.$route.params.id, data)
        if (userUpdated) {
          this.$toast.success('Utilisateur mis à jour.', { duration: 2000 })
          this.$router.push({ path: '/' })
        }
      } catch (error) {
        if (error.response.data.errors) this.errors = error.response.data.errors
      }
    }
  }
}
</script>