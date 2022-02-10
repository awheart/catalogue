<template>
  <div>
    <nav class="navbar">
      <ul class="nav">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/"> Accueil </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/games"> Games </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/catalogue"> Catalog </nuxt-link>
        </li>
        <li class="nav-item last-nav-item">
          <nuxt-link class="nav-link" to="/account"> My Account </nuxt-link>
        </li>
      </ul>
    </nav>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style>
</style>
