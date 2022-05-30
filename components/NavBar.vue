<template>
    <div>
        <nav class="custom-navbar">
            <ul class="custom-nav nav-logo">
                <li class="navigation-item">
                    <img src="https://res.cloudinary.com/catalogue-recipe/image/upload/c_scale,w_150/v1653911048/logo_transparent_background_rtr96w.png"
                        alt="logo vos recettes faciles">
                </li>
            </ul>
            <ul class="custom-nav nav-page">
                <li class="navigation-item">
                    <nuxt-link class="normal-link" to="/" alt="retour à l'accueil"> Accueil
                    </nuxt-link>
                </li>
                <li class="navigation-item">
                    <nuxt-link class="normal-link" to="/recipes" alt="toutes les recettes">
                        Recettes </nuxt-link>
                </li>
                <li class="navigation-item">
                    <nuxt-link class="normal-link" to="/recipes/add" alt="ajouter une recette">
                        Ajouter une recette
                    </nuxt-link>
                </li>
                <li class="navigation-item">
                    <nuxt-link class="normal-link" to="/recipes/recetomatic" alt="le recetomatic">
                        Recet'Omatic
                    </nuxt-link>
                </li>
            </ul>
            <ul class="custom-nav nav-connect" v-if="!$auth.loggedIn">
                <li class="navigation-item">
                    <nuxt-link class="icon-link" to="/users/login" alt="se connecter">
                        <b-icon icon='person-circle' width="48px" height="48px"></b-icon>
                    </nuxt-link>
                </li>

            </ul>
            <ul class="custom-nav nav-user" v-if="$auth.loggedIn">
            <li class="navigation-icon" v-if="$auth.user.role.role_name == 'admin'">
                    <nuxt-link class="icon-link" to="/users/dashboard" alt="panneau d'administration">
                        <b-icon icon='gear-fill' width="48px" height="48px"></b-icon>
                    </nuxt-link>
                </li>
                <li class="navigation-icon">
                    <nuxt-link class="icon-link" to="/users/my-account" alt="mon compte">
                        <b-icon icon='person-circle' width="48px" height="48px"></b-icon>
                    </nuxt-link>
                </li>
                <li class="navigation-icon">
                    <nuxt-link class="icon-link" to="/users/logout" alt="se déconnecter">
                        <b-icon icon='box-arrow-right' width="48px" height="48px"></b-icon>
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.nuxt-link-exact-active {
    color: #FF5700;
}

.custom-navbar ul li {
    list-style: none;
}

.custom-nav {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}

.nav-page,
.nav-logo,
.nav-connect,
.nav-user {
    position: absolute;
}

.nav-logo {
    left: 5%;
}

.nav-connect,
.nav-user {
    right: 5%;
}

.custom-navbar {
    position: relative;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgb(255, 255, 255);
    border: dashed #FF5700;
    padding: 0.5rem 1rem;
    height: 10vh;
    border-radius: 0 0 50px 50px;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}

.navigation-item {
    margin-right: 5vw;
}
a {
    padding: 0.5rem 1rem;
}

a:hover {
    text-decoration: none;
}

.nav-page {
    width: max-content;
}

.last-nav-item {
    margin-right: 0;
}

a {
    display: block;
    color: #4F2816;
    transition: 150ms ease-in-out;
}

a:hover {
    color: #FF5700;
}

.normal-link::after {
    display: block;
    content: '';
    border-bottom: 2px solid #FF5700;
    transform: scaleX(0);
    transition: transform 150ms ease-in;
    transform-origin: 0% 50%;
}

.normal-link:hover::after {
    transform: scaleX(1);
}

a {
    color: black;
    transition: color 150ms ease-in-out;
}

a:hover {
    color: #FF5700;
}

a:active {
    color: #FF5700;
}
</style>