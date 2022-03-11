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
      <ul class="navbar-nav"
          v-if="!$auth.loggedIn">
          <li class="nav-item">
            <nuxt-link to="/user/register" class="nav-link" exact-active-class="active">Register</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/user/login" class="nav-link" exact-active-class="active">Login</nuxt-link>
          </li>
      </ul>
      <ul class="navbar-nav"
          v-if="$auth.loggedIn">
          <li class="nav-item">
            <nuxt-link to="/user/my-account" class="nav-link" exact-active-class="active">My Account</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/user/logout" class="nav-link" exact-active-class="active">Logout</nuxt-link>
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
