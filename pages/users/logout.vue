<template>
  <div>
    <div class="tomato-bg">
      <NavBar />
      <div class="wrap">
        test
        <h1>Bienvenue</h1>
        <h1>You are now logged out !</h1>
        <hr>

        <p>Sending you back to home page, please wait !</p>
      </div>
      <FooterMain />
    </div>
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