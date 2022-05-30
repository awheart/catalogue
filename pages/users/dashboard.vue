<template>
    <div>
        <button @click="isUser=true">Utilisateur</button>
        <button @click="isUser=false">Recettes</button>
        <table v-if="isUser" class="table table-stripped table-borderes">
            <thead>
                <tr>
                    <th>Nom d'utilisateur</th>
                    <th>email</th>
                    <th>rôle</th>
                    <th>tranche d'âge</th>
                    <th>icône</th>
                    <th>id</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user of Users" :key="user.id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role.role_name }}</td>
                    <td>{{ user.age }}</td>
                    <td>{{ user.icone }}</td>
                    <td>{{ user.id }}</td>
                    <td>
                        <button v-if="user.role_id !== 2" @click="deleteUser(user)" class="btn btn-danger">delete</button>
                    </td>
                    <td>
                        <button @click="$router.push(`/users/${user.id}/details`)"
                            class="btn btn-primary mr-3">Détails</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <table v-if="!isUser" class="table table-stripped table-borderes">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Créateur</th>
                    <th>Date de création</th>
                    <th>Nombre de like</th>
                    <th>Image</th>
                    <th>id</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="recipe of Recipes" :key="recipe.id">
                    <td>{{ recipe.title }}</td>
                    <td>{{ recipe.author }}</td>
                    <td>{{ recipe.created_at }}</td>
                    <td>{{ recipe.like }}</td>
                    <td>{{ recipe.icone }}</td>
                    <td>{{ recipe.id }}</td>
                    <td>
                        <button @click="deleteRecipe(recipe)" class="btn btn-danger">delete</button>
                    </td>
                    <td>
                        <button @click="$router.push(`/recipes/${recipe.id}/details`)"
                            class="btn btn-primary mr-3">Détails</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "DashboardPage",
    data() {
        return {
            Users: [],
            Recipes: [],
            isUser: true
        }
    },
    async mounted() {
        try {
            const userData = await this.$axios.get(`/api/users`)
            // const recipeData = await this.$axios.get('/api/recipes')
            this.Users = userData.data
        } catch (err) {
            console.error(err)
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

