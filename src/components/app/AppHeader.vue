<template>
    <nav class="navigation">
        <div class="nav-wrapper navigation__app-header">
            <div class="container">
                <a href="#">Logo</a>
                <ul class="right">
                    <li><a>Sass</a></li>
                    <li><a>Components</a></li>
                    <li
                            class="navigation__user-name"
                            v-if="username"
                    >{{ username }}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'app-header',
        computed: {
            username() {
                return this.$store.getters.currentUser ? this.$store.getters.currentUser.username : false;
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

    }

</style>
