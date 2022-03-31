<template>
  <div>
    <h1>User Details</h1>

    <hr />

    <div class="alert alert-success" v-if="$route.params.updated == 'yes'">
      Record updated successfully
    </div>

    <h2>{{ user.name }}</h2>

    <h6>By {{ user.email }}</h6>

    <p>{{ user.role }}</p>

    <hr />
    <div class="d-flex justify-content-between">
      <div>
        <nuxt-link
          :to="'/users/' + user._id + '/update'"
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
            if (confirm('Are you sure you want to delete') === true) {
                try {
                    const res = await this.$axios.delete(`/api/users/${user._id}`)
                    if (res) {
                        await this.$router.push({ path:'/users/dashboard', params:{ deleted:'yes' } })
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        }
  }
}
</script>