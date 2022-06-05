<template>
  <div class="home-bg">
    <NavBar />
    <div class="wrap">
      test
      <h1>Bienvenue</h1>
      <FooterMain />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style scoped>
.home-bg {
  position: absolute;
  min-height: 100vh;
  width: 100%;
  background-image: url('https://res.cloudinary.com/catalogue-recipe/image/upload/c_scale,w_auto,q_auto:low,x_20,y_396/v1653928715/tomato_bg.jpg');
}
</style>