<template>
    <div id="app">
        <app-header></app-header>
        <router-view class=""/>
    </div>
</template>

<script>
    // Components
    import AppHeader from '@/components/app/AppHeader';

    // EventBus
    import {EventBus} from "./main";

    // Mixins
    import {localStorageLogin} from "./mixins/localStorageLogin";

    export default {
        name: 'app',
        components: {
            AppHeader
        },
        created() {

            EventBus.$on('userUpdated', () => {

                console.log(this.$router.currentRoute.name);

                if (this.$router.currentRoute.name === 'login') {
                    this.$router.push({name: 'home'});
                }

            });

        },
        mixins: [
            localStorageLogin
        ]
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
        background-position: center;
    }

</style>
