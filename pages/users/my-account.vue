<template>
  <div>
    <div class="tomato-bg">
      <NavBar />
      <div class="wrap">
        <h1>My Account</h1>

        <hr>

        <div class="card">
          <div class="card-body">
            <h4>Name: {{ this.$auth.user.username }}</h4>
            <h4>Authorization: {{ this.$auth.user.role.role_name }}</h4>
            <h4>id: {{ User.id }}</h4>
            <div class="mb-5">
              <strong>Email:</strong> {{ this.$auth.user.email }}
            </div>
            <form action="" method="post" @submit.prevent="changePassword()">
              <div class="form-group">

                <label for="old-password">Votre mot de passe</label>
                <input type="password" name="old-password" class="form-control" :class="{ 'is-invalid': errors }"
                  v-model="password" placeholder="mot de passe actuel">
                <div class="invalid-feedback" v-if="errors && errors.password">
                  {{ this.errors.password.msg }}
                </div>

                <label for="new-password">Nouveau mot de passe</label>
                <input type="password" name="new-password" class="form-control" :class="{ 'is-invalid': errors }"
                  v-model="newPassword" placeholder="nouveau mot de passe">
                <div class="invalid-feedback" v-if="errors && errors.newPassword">
                  {{ this.errors.newPassword.msg }}
                </div>

                <label for="password-check">Répétez le nouveau mot de passe</label>
                <input type="password" name="password-check" class="form-control" :class="{ 'is-invalid': errors }"
                  v-model="passwordCheck" placeholder="nouveau mot de passe">
                <div class="invalid-feedback" v-if="errors && errors.passwordCheck">
                  {{ this.errors.passwordCheck.msg }}
                </div>

              </div>
              <input type="submit" value="Modifier le mot de passe" class="btn btn-primary mr-3">
            </form>
            <nuxt-link to="/users/logout" class="btn btn-danger">Logout</nuxt-link>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      errors: null,
      password: null,
      newPassword: null,
      passwordCheck: null,
      User: []
    }
  },
  async beforeMount() {
    try {
      const { data } = await this.$axios.get(`/api/users/user/who?email=${this.$auth.user.email}`)
      this.User = data
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    async changePassword() {
      this.errors = null
      try {
        const response = await this.$axios.patch('/api/users/' + this.User.id, {
          password: this.password,
          newPassword: this.newPassword,
          passwordCheck: this.passwordCheck
        })
        if (response) {
          this.$router.push('/', 1000)
          this.$toast.success('Le mot de passe a été modifié.', { duration: 1000 })
        }
      } catch (err) {
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>