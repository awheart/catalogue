<template>
    <div>
        <nav class="custom-navbar">
            <div class="burger" @click="show = !show">
                <b-icon icon="list" width="48px" height="48px"></b-icon>
            </div>
            <nuxt-link to="/"><img
                    src="https://res.cloudinary.com/catalogue-recipe/image/upload/c_scale,w_200/v1653911048/logo_transparent_background.png"
                    alt="logo vos recettes faciles">
            </nuxt-link>
            <nuxt-link class="normal-link" to="/" alt="retour à l'accueil"> Accueil
            </nuxt-link>
            <nuxt-link class="normal-link" to="/recipes" alt="toutes les recettes">
                Recettes </nuxt-link>
            <nuxt-link class="normal-link" to="/recipes/add" alt="ajouter une recette">
                Ajouter une recette
            </nuxt-link>
            <nuxt-link class="normal-link" to="/recipes/recetomatic" alt="le recetomatic">
                Recet'Omatic
            </nuxt-link>
            <nuxt-link v-if="!$auth.loggedIn" class="icon-link" to="/users/login" alt="se connecter">
                <b-icon icon='person-circle' width="48px" height="48px"></b-icon>
            </nuxt-link>
            <nuxt-link class="icon-link" v-if="$auth.loggedIn && $auth.user.role.role_name == 'admin'"
                to="/users/dashboard" alt="panneau d'administration">
                <b-icon icon='gear-fill' width="48px" height="48px"></b-icon>
            </nuxt-link>
            <nuxt-link class="icon-link" v-if="$auth.loggedIn" to="/users/my-account" alt="mon compte">
                <b-icon icon='person-circle' width="48px" height="48px"></b-icon>
            </nuxt-link>
            <nuxt-link class="icon-link" v-if="$auth.loggedIn" to="/users/logout" alt="se déconnecter">
                <b-icon icon='box-arrow-right' width="48px" height="48px"></b-icon>
            </nuxt-link>
        </nav>
        <transition name="hiddenTransition">
            <div class="hidden" v-if="show">
                <ul class="hidden-list">
                    <li>
                        <nuxt-link class="normal-link" to="/" alt="retour à l'accueil"> Accueil
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="normal-link" to="/recipes" alt="toutes les recettes">
                            Recettes </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="normal-link" to="/recipes/add" alt="ajouter une recette">
                            Ajouter une recette
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="normal-link" to="/recipes/recetomatic" alt="le recetomatic">
                            Recet'Omatic
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link v-if="!$auth.loggedIn" class="icon-link" to="/users/login" alt="se connecter">
                            <b-icon icon='person-circle' width="48px" height="48px"></b-icon>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="icon-link" v-if="$auth.loggedIn && $auth.user.role.role_name == 'admin'"
                            to="/users/dashboard" alt="panneau d'administration">
                            <b-icon icon='gear-fill' width="48px" height="48px"></b-icon>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="icon-link" v-if="$auth.loggedIn" to="/users/my-account" alt="mon compte">
                            <b-icon icon='person-circle' width="48px" height="48px"></b-icon>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="icon-link" v-if="$auth.loggedIn" to="/users/logout" alt="se déconnecter">
                            <b-icon icon='box-arrow-right' width="48px" height="48px"></b-icon>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    }
}
</script>

<style scoped>
.hidden-list {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 15vh;
}

.hidden-list li {
    list-style: none;
    padding: 0.5em 0.5em;
}

.hidden-list li a {
    display: block;
    float: left;
}

.hidden {
    position: absolute;
    display: none;
    top: 10vh;
    width: 100%;
    z-index: 100;
    height: 85vh;
    background-color: rgb(255, 255, 255);
    border: dashed #FF5700;
    border-radius: 0 0 0.5em 0.5em;
    overflow: hidden;
}

.hiddenTransition-enter-active,
.hiddenTransition-leave-active {
    transition: height 0.5s
}

.hiddenTransition-enter,
.hiddenTransition-leave-to {
    height: 0vh;
}

.burger {
    display: none;
}

@media screen and (max-width: 800px) {
    .custom-navbar.responsive {
        position: relative;
    }

    .custom-navbar.responsive .icon {
        position: absolute;
        right: 0;
        top: 0;
    }

    .custom-navbar.responsive a {
        float: none;
        display: block;
        text-align: left;
    }
}

.nuxt-link-exact-active {
    color: #FF5700;
}

.custom-navbar ul li {
    list-style: none;
}

.custom-navbar {
    position: fixed;
    z-index: 999;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgb(255, 255, 255);
    border: dashed #FF5700;
    padding: 0.5rem 1rem;
    top: 0;
    min-height: 140px;
    border-radius: 0 0 50px 50px;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
}

a:hover {
    text-decoration: none;
}

.icon {
    display: block;
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

@media screen and (max-width: 800px) {
    .custom-navbar a:not(:nth-child(-n + 2)) {
        display: none;
    }

    .custom-navbar a.icon {
        float: right;
        display: block;
    }

    .burger {
        display: block;
    }

    .hidden {
        display: block;
    }
}
</style>