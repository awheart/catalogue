<template>
    <div>
        <div class="tomato-bg">
            <NavBar />
            <div class="wrap tool-wrap">
                <div v-if="isUser" class="user-search">
                    <input type="search" v-model="inputUser" placeholder="Chercher un utilisateur..." />
                </div>
                <div v-else class="recipe-search">
                    <input type="search" v-model="inputRecipe" placeholder="Chercher une recette..." />
                </div>
                <h1>Administration</h1>
                <button class="btn-select"
                    :style="[isUser ? { 'background-color': '#FFF', 'color': '#FF5700', 'border': '1px solid #FF5700' } : { 'background-color': '#FF5700' }]"
                    @click="isUser = true; inputRecipe = ''">Utilisateur</button>
                <button class="btn-select"
                    :style="[!isUser ? { 'background-color': '#FFF', 'color': '#FF5700', 'border': '1px solid #FF5700' } : { 'background-color': '#FF5700' }]"
                    @click="isUser = false; inputUser = ''">Recettes</button>
                <div class="table-container" v-if="isUser">
                    <table class="catalogue-table table list">
                        <caption>Utilisateurs</caption>
                        <thead>
                            <tr>
                                <th>Nom d'utilisateur</th>
                                <th class="responsive-hidden">email</th>
                                <th class="responsive-hidden">rôle</th>
                                <th class="mid-responsive-hidden">Date de création</th>
                                <th class="mid-responsive-hidden">icône</th>
                                <th>id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in userFilteredList" :key="user.id">
                                <td>{{ user.username }}</td>
                                <td class="responsive-hidden">{{ user.email }}</td>
                                <td class="responsive-hidden">{{ user.role.role_name }}</td>
                                <td class="mid-responsive-hidden">{{ user.created_at }}</td>
                                <td class="mid-responsive-hidden"><img :src="user.icone" alt="" class="image-list"></td>
                                <td>{{ user.id }}</td>
                                <td>
                                    <a class="btn-dashboard delete" v-if="$auth.user.role_id !== 2">
                                        <b-icon icon="x-circle" width="40px" height="40px" @click="deleteUser(user)">
                                        </b-icon>
                                    </a>
                                </td>
                                <td>
                                    <a class="btn-dashboard user-detail" v-if="$auth.user.role_id !== 2">
                                        <b-icon icon="pencil-square" width="40px" height="40px"
                                            @click="$router.push(`/users/details/${user.id}`)">
                                        </b-icon>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-container" v-if="!isUser">
                    <table class="catalogue-table table list">
                        <caption>Recettes à valider</caption>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th class="responsive-hidden">Créateur</th>
                                <th class="responsive-hidden">Date de création</th>
                                <th class="mid-responsive-hidden">Nombre de like</th>
                                <th class="mid-responsive-hidden">Image</th>
                                <th>id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="recipe in recipeFilteredList" :key="recipe.id">
                                <td>{{ recipe.title }}</td>
                                <td class="responsive-hidden">{{ recipe.author.username }}</td>
                                <td class="responsive-hidden">{{ recipe.created_at }}</td>
                                <td class="mid-responsive-hidden">{{ recipe.likes.length }}</td>
                                <td class="mid-responsive-hidden"><img :src="recipe.image" class="image-list" alt="">
                                </td>
                                <td>{{ recipe.id }}</td>
                                <td>
                                    <a class="btn-dashboard delete">
                                        <b-icon icon="x-circle" width="40px" height="40px"
                                            @click="deleteRecipe(recipe)">
                                        </b-icon>
                                    </a>
                                </td>
                                <td>
                                    <a class="btn-dashboard recipe-detail">
                                        <b-icon icon="pencil-square" width="40px" height="40px"
                                            @click="$router.push(`/recipes/update/${recipe.id}`)">
                                        </b-icon>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <FooterMain />
        </div>
    </div>
</template>

<style scoped>
.btn-select {
    color: #fff;
    border-radius: 15px;
    border: none;
    vertical-align: middle;
    padding: 10px 10px;
    font-size: 20px;
    background-color: #FF5700;
    margin: 1vh 0;
    transition: all 0.2s ease-in-out;
    border: 1px solid transparent;
    text-align: center;
}

.tomato-bg {
    position: absolute;
    min-height: 100vh;
    width: 100%;
    background-image: url('https://res.cloudinary.com/catalogue-recipe/image/upload/c_scale,w_auto,q_auto:low,x_20,y_396/v1653928715/tomato_bg.jpg');
}

.tool-wrap {
    text-align: center;
}

h1 {
    color: #FF5700;
}

.mid-responsive-hidden,
.responsive-hidden {
    transition: display 0.5s ease-in-out;
}

@media screen and (max-width: 1250px) {
    .mid-responsive-hidden {
        display: none;
    }
}

@media screen and (max-width: 600px) {
    .responsive-hidden {
        display: none;
    }
}

.btn-dashboard {
    color: #000;
    transition: color 0.3s ease-in-out;
}

.btn-dashboard:hover {
    color: #FF5700;
}

.image-list {
    height: 50px;
    width: auto;
}

.table-container {
    width: 90%;
    padding: 5%;
    margin: 1vh auto;
    border-radius: 45px;
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

