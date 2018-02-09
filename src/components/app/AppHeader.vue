<template>
    <nav class="navigation">
        <div class="nav-wrapper navigation__app-header">
            <div class="container">

                <a
                        v-if="currentLogoString != logoStrings.back"
                >
                    {{ currentLogoString }}
                </a>

                <a
                        class="navigation__back-btn"
                        v-else
                        @click="goBackToSongs"
                >
                    {{ currentLogoString }}
                </a>

                <ul
                        class="right"
                        v-if="firstName"
                >
                    <li>
                        <a
                            @click="googleLogout"
                        >
                            Log Out
                        </a>
                    </li>
                    <li
                            class="navigation__user-name"
                    >
                        {{ firstName }}
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

            goBackToSongs() {
                this.$router.push({name: 'home'});
            },

            watchRoutes(routeName) {

                switch (routeName) {
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

            },

            // Google logout
            googleLogout() {

                this.$googleAuth().signOut(() => {

                    console.log('Signed out');
                    this.$store.dispatch('signOut');
                    this.$router.push({name: 'login'});

                }, error => {
                    console.error(error);
                });

            }

        },

        watch: {
            '$route'(to, from) {
                this.watchRoutes(to.name);
            }
        },

        mounted() {
            this.watchRoutes(this.currentRouteName);
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

        &__back-btn {
            cursor: pointer;
            transition: all .3s ease-in-out;
        }

        .container {
            padding-top: 4px;
            height: 100%;
        }

    }

</style>
