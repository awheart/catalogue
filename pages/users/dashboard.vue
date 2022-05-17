<template>
    <div>
        <table class="table table-stripped table-borderes">
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
                    <td>{{ user.role }}</td>
                    <td>{{ user.age }}</td>
                    <td>{{ user.icone }}</td>
                    <td>{{ user.id }}</td>
                    <td>
                        <button @click="deleteUser(user)" class="btn btn-danger">delete</button>
                    </td>
                    <td>
                        <button @click="$router.push(`/users/${user.id}/details`)"
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
            Recipes: []
        }
    },
    async mounted() {
        try {
            const userData = await this.$axios.get(`/api/users`)
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
                    const res = await this.$axios.delete(`/api/users/${user.users_id}`)
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

