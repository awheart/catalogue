<template>
  <div>
    <h1>User Details</h1>

    <hr />    

    <h2>Nom d'utilisateur : {{ user.username }}</h2>

    <h6>Email : {{ user.email }}</h6>
    <p>Role : {{ user.role }}</p>

    <hr />
    <div class="d-flex justify-content-between">
      <div>
        <nuxt-link
          :to="'/users/' + user.id + '/update'"
          class="btn btn-primary mr-3"
          >Update</nuxt-link>
        <button @click="deleteUser(user)" class="btn btn-danger">delete</button>
      </div>
      <nuxt-link to="/users/dashboard" class="btn btn-secondary mr-3">Back to dashboard</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UserDetails',
  middleware: 'auth',
  async asyncData(context){
    const {data} = await context.$axios.get('/api/users/' + context.route.params.id)
    return {
      user : data
    }
  },
  methods:{
    async deleteUser(user) {
            if (this.$auth.user.email == user.email) return alert('cannot delete the account currently connected.')
            if (confirm(`Confirmer la suppression de l'utilisateur ${user.username}`) === true) {
                try {
                    const res = await this.$axios.delete(`/api/users/${user.id}`)
                    if (res) {
                        await this.$router.push({ path: '/users/dashboard' })
                        this.$toast.success('Entité supprimée avec succès!', { duration: 2000 })
                    }
                } catch (err) {
                    this.$toast.error('Erreur durant la suppression.', { duration: 2000 })
                }
            }
        }
  }
}
</script>