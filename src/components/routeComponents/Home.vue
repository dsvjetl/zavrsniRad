<template>
    <div class="home">
        <h3>{{ $store.getters.currentUser.username }}</h3>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>

    .home {
        color: #fff;
    }

</style>
