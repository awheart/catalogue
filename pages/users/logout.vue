<template>
  <div>
    <h1>You are now logged out !</h1>
    <hr>

    <p>Sending you back to home page, please wait !</p>
  </div>
</template>

<script>
export default {
  name: 'logoutPage',
  middleware: 'auth',

  async asyncData(context) {
    await context.$auth.logout()
  }
}
</script>