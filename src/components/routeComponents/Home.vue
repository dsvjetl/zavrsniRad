<template>
    <div class="home">
        <h3>{{ currentUser }}</h3>
    </div>
</template>

<script>
    export default {
        name: 'home',
        computed: {
            currentUser() {
                return this.$store.getters.currentUser.firstName;
            },
        },
        mounted() {
            console.log(this.$store);
        },
        created() {
            this.$store.dispatch('getAllSongs');
        }
    }
</script>

<style lang="scss" scoped>

    .home {
        color: #fff;
    }

</style>
