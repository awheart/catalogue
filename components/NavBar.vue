<template>
    <div>
        <nav class="custom-navbar">
                <ul class="custom-nav nav-page">
                    <li class="navigation-item">
                        <nuxt-link class="custom-nav-link" to="/"> Accueil </nuxt-link>
                    </li>
                    <li class="navigation-item">
                        <nuxt-link class="custom-nav-link" to="/games"> Recettes </nuxt-link>
                    </li>
                    <li class="navigation-item">
                        <nuxt-link class="custom-nav-link" to="/catalogue"> Ajouter une recette </nuxt-link>
                    </li>
                    <li class="navigation-item">
                        <nuxt-link class="custom-nav-link" to="/catalogue"> Recet'Omatic </nuxt-link>
                    </li>
                </ul>
            <ul class="custom-nav admin-nav" v-if="$auth.loggedIn && ($auth.user.role == 'admin')">
                <li class="navigation-item">
                    <nuxt-link class="custom-nav-link" to="/users/dashboard" exact-active-class="active"> Administration
                    </nuxt-link>
                </li>
            </ul>
            <ul class="custom-nav connect-nav" v-if="!$auth.loggedIn">
                <li class="navigation-item">
                    <nuxt-link to="/users/login" class="custom-nav-link" exact-active-class="active">Se connecter</nuxt-link>
                </li>
            </ul>
            <ul class="custom-nav user-nav" v-if="$auth.loggedIn">
                <li>
                    <a href="/users/my-account" style="color:black">
                        <b-icon icon='person-circle' width="48px" height="48px" fill=black></b-icon>
                    </a>
                </li>
                <li class="navigation-nav">
                    <nuxt-link to="/users/logout" class="custom-nav-link" exact-active-class="active">Logout</nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style sc>
</style>