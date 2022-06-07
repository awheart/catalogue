<template>
    <div>
        <div class="tomato-bg">
            <NavBar />
            <div class="wrap">
                <div v-if="isUser" class="user-search">
                    <input type="search" v-model="inputUser" placeholder="Chercher un utilisateur..." />
                </div>
                <div v-else class="recipe-search">
                    <input type="search" v-model="inputRecipe" placeholder="Chercher une recette..." />
                </div>
                <h1>Administration</h1>
                <button @click="isUser = true; inputRecipe = ''">Utilisateur</button>
                <button @click="isUser = false; inputUser = ''">Recettes</button>

                <table v-if="isUser" class="table list">
                    <caption>Utilisateurs</caption>
                    <thead>
                        <tr>
                            <th>Nom d'utilisateur</th>
                            <th class="responsive-hidden">email</th>
                            <th class="responsive-hidden">rôle</th>
                            <th class="responsive-hidden">Date de création</th>
                            <th class="responsive-hidden">icône</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in userFilteredList" :key="user.id">
                            <td>{{ user.username }}</td>
                            <td class="responsive-hidden">{{ user.email }}</td>
                            <td class="responsive-hidden">{{ user.role.role_name }}</td>
                            <td class="responsive-hidden">{{ user.created_at }}</td>
                            <td class="responsive-hidden"><img :src="user.icone" alt="" class="image-list"></td>
                            <td>{{ user.id }}</td>
                            <td>
                                <a class="delete" v-if="user.role_id !== 2">
                                    <b-icon icon="x-circle" width="40px" height="40px" @click="deleteUser(user)">
                                    </b-icon>
                                </a>
                            </td>
                            <td>
                                <a class="user-detail" v-if="user.role_id !== 2">
                                    <b-icon icon="pencil-square" width="40px" height="40px"
                                        @click="$router.push(`/users/details/${user.id}`)">
                                    </b-icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="!isUser" class="table list">
                    <caption>Recettes à valider</caption>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th class="responsive-hidden">Créateur</th>
                            <th class="responsive-hidden">Date de création</th>
                            <th class="responsive-hidden">Nombre de like</th>
                            <th class="responsive-hidden">Image</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="recipe in recipeFilteredList" :key="recipe.id">
                            <td>{{ recipe.title }}</td>
                            <td class="responsive-hidden">{{ recipe.author.username }}</td>
                            <td class="responsive-hidden">{{ recipe.created_at }}</td>
                            <td class="responsive-hidden">{{ recipe.likes.length }}</td>
                            <td class="responsive-hidden"><img :src="recipe.image" class="image-list" alt=""></td>
                            <td>{{ recipe.id }}</td>
                            <td>
                                <a class="delete">
                                    <b-icon icon="x-circle" width="40px" height="40px" @click="deleteRecipe(recipe)">
                                    </b-icon>
                                </a>
                            </td>
                            <td>
                                <a class="recipe-detail">
                                    <b-icon icon="pencil-square" width="40px" height="40px"
                                        @click="$router.push(`/recipes/details/${recipe.id}`)">
                                    </b-icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <FooterMain />
        </div>
    </div>
</template>

<style scoped>
@media screen and (max-width: 900px) {

    .responsive-hidden {
        display: none;
    }
}

.image-list {
    height: 50px;
    width: auto;
}

.list {
    border: 2px solid #FF5700;
}
</style>

<script>
export default {
    name: "DashboardPage",
    data() {
        return {
            users: [],
            recipes: [],
            isUser: true,
            inputUser: '',
            inputRecipe: ''
        }
    },
    beforeCreate() {
        if (!this.$auth.loggedIn || this.$auth.user.role.role_name != 'admin') {
            this.$router.push({ path: '/users/login' })
        }
    },
    async mounted() {
        try {
            const userData = await this.$axios.get(`/api/users`)
            const recipeData = await this.$axios.get('/api/recipes?is_published=false')
            this.users = userData.data
            this.recipes = recipeData.data
        } catch (err) {
            console.error(err)
        }
    },
    computed: {
        userFilteredList() {
            return this.users.filter(user => user.username.toLowerCase().includes(this.inputUser.toLowerCase()))
        },
        recipeFilteredList() {
            return this.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.inputRecipe.toLowerCase()))
        }
    },
    methods: {
        async deleteUser(user) {
            if (this.$auth.user.email == user.email) return alert('cannot delete the account currently connected.')
            if (confirm('Are you sure you want to delete') === true) {
                try {
                    const res = await this.$axios.delete(`/api/users/${user.id}`)
                    if (res) {
                        const userData = await this.$axios.get('/api/users')
                        if (user) this.Users = userData.data
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
}
</script>

