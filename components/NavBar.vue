<template>
    <div>
        <nav class="navbar">
            <ul class="nav">
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/"> Accueil </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/games"> Recettes </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/catalogue"> Ajouter une recette </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/catalogue"> Recet'Omatic </nuxt-link>
                </li>
            </ul>
            <ul class="navbar-nav" v-if="$auth.loggedIn && ($auth.user.role == 'admin')">
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/users/dashboard" exact-active-class="active"> Administration
                    </nuxt-link>
                </li>
            </ul>
            <ul class="navbar-nav" v-if="!$auth.loggedIn">
                <li class="nav-item">
                    <nuxt-link to="/users/login" class="nav-link" exact-active-class="active">Se connecter</nuxt-link>
                </li>
            </ul>
            <ul class="navbar-nav" v-if="$auth.loggedIn">
                <li>

                    <a href="" style="color:black">
                        <b-icon icon='person-circle' width="48px" height="48px" fill=black></b-icon>
                    </a>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/users/logout" class="nav-link" exact-active-class="active">Logout</nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style>
.btn-secondary {
    background-color: red;
}
</style>