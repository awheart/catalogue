<template>
    <div>
        <h1>En cours d'autorisation...</h1>
        <hr>

        <p>Patientez, vous allez être rediriger !</p>
    </div>
</template>

<script>
export default {
    name: "loginInProgress",
    created() {
        setTimeout(this.$router.push('/'), 1000)
    }

}
</script>