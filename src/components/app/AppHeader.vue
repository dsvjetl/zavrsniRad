<template>
    <nav class="navigation">
        <div class="nav-wrapper navigation__app-header">
            <div class="container">

                <a>
                    {{ currentLogoString }}
                </a>

                <ul
                        class="right"
                        v-if="currentRouteName != 'login'"
                >
                    <li><a>Sass</a></li>
                    <li><a>Components</a></li>
                    <li
                            class="navigation__user-name"
                            v-if="firstName"
                    >{{ firstName }}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'app-header',

        data() {
            return {
                logoStrings: {
                    login: 'Hello User! Please Log In!',
                    welcome: 'Welcome User!',
                    back: 'Go Back'
                },
                currentLogoString: ''
            }
        },

        computed: {

            firstName() {
                return this.$store.getters.currentUser ? this.$store.getters.currentUser.firstName : false;
            },
            currentRouteName() {
                return this.$router.currentRoute.name;
            }

        },

        methods: {



        },

        watch: {
            '$route'(to, from) {

                console.log(to);

                switch(to.name) {
                    case 'login':
                        this.currentLogoString = this.logoStrings.login;
                        break;
                    case 'home':
                        this.currentLogoString = this.logoStrings.welcome;
                        break;
                    case 'songPlayer':
                        this.currentLogoString = this.logoStrings.back;
                        break;
                }

            }
        }
    }
</script>

<style lang="scss" scoped>

    .navigation {
        height: 70px;

        &__app-header {
            background-color: $black;
        }

        &__user-name {
            font-size: 18px;
            color: darken(#fff, 20%);
        }

        .container {
            padding-top: 4px;
            height: 100%;
        }

    }

</style>
