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
    await context.$toast.info('Vous avez été déconnectez.', { duration: 2000 })
  }
}
</script>