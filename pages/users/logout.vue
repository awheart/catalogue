<template>
  <div>
    <h1>You are now logged out !</h1>
    <hr>

    <p>Sending you back to home page, please wait !</p>
  </div>
</template>

<script>
export default {
  name: 'LogoutPage',
  middleware: 'auth',

  async asyncData(context) {
    await context.$auth.logout()
  },
  updated() {
    this.$toast.success('Vous avez été déconnecté.', { duration: 1000 })
  }
}
</script>