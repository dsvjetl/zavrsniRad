<template>
    <div class="login-failed">
        <div class="login-failed__modal col s12 l4 offset-l4">

            <h3>
                Nuespješna prijava!
            </h3>

            <p>
                {{ loginFailMessage }}
            </p>

            <button
                    class="btn login-failed__back-btn"
                    @click="backToLogin"
            >
                Shvaćam
            </button>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'login-failed',
        props: {
            loginFailMessage: String
        },
        methods: {
            backToLogin() {
                this.$emit('backToLogin');
            }
        }
    }
</script>

<style lang="scss" scoped>

    .login-failed {

        &__modal {
            margin-top: 10%;
            border-radius: 5px;
            background-color: transparentize($black, .5);
            color: $white-almost;
            padding: 2%;
        }

        &__back-btn {

            background-color: $black;
            color: $white-almost;
            width: 49%;

            &:hover {
                background-color: lighten($black, 15%);
            }
        }

    }

</style>
