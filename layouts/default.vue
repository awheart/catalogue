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
      </ul>
        <ul class="navbar-nav"
            v-if="$auth.loggedIn && ($auth.user.role == 'admin')">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/users/dashboard" exact-active-class="active"> Administration </nuxt-link>
          </li>
        </ul>
      <ul class="navbar-nav"
          v-if="!$auth.loggedIn">
          <li class="nav-item">
            <nuxt-link to="/users/login" class="nav-link" exact-active-class="active">Se connecter</nuxt-link>
          </li>
      </ul>
      <ul class="navbar-nav"
          v-if="$auth.loggedIn">
          <li class="nav-item">
            <nuxt-link to="/users/my-account" class="nav-link" exact-active-class="active">My Account</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/users/logout" class="nav-link" exact-active-class="active">Logout</nuxt-link>
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
