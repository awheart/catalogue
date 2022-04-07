<template>
    <div>
        <table class="table table-stripped table-borderes">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>email</th>
                    <th>role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user of Users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td><button @click="deleteUser(user)" class="btn btn-danger">delete</button></td>
                    <td><button @click="$router.push(`/users/${user._id}/details`)" class="btn btn-primary mr-3">Détails</button></td>
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
            Users: []
        }
    },
    async mounted() {
        try {
            const {data} = await this.$axios.get( '/api/users')
            this.Users = data
        } catch (err) {
            console.error(err)
        }
    },
    methods: {
        async deleteUser(user) {
            if (this.$auth.user.email == user.email) return alert('cannot delete the account currently connected.')
            if (confirm('Are you sure you want to delete') === true) {
                try {
                    const res = await this.$axios.delete( `/api/users/${user._id}`)
                    if (res) {
                        const {data} =  await this.$axios.get( 'api/users')
                        if(user) this.Users = data
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
}
</script>

