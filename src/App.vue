<template>
    <div id="app">
        <app-header></app-header>
        <router-view class="container" />
    </div>
</template>

<script>
    // Components
    import AppHeader from '@/components/AppHeader';

    export default {
        name: 'app',
        components: {
            AppHeader
        }
    }
</script>

<style lang="scss">
    @import './scss/base';
    @import './scss/colors';
    @import './scss/state-animations';

    body {
        background-image: url('./assets/img/bg-main.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        height: 100vh;
        background-position-x: center;
    }

</style>
