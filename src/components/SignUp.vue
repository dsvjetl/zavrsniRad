<template>
    <div class="sign-up">
        <div class="sign-up__modal col s12 l4 offset-l4">

            <h5 class="sign-up__title">
                Sign up
            </h5>

            <div class="input-field">
                <input
                        id="dava-app-username"
                        type="text"
                        autocomplete="off"
                        v-model="username"
                >
                <label for="dava-app-username">Username</label>
            </div>
            <div class="input-field">
                <input
                        id="dava-app-password"
                        type="password"
                        autocomplete="off"
                        v-model="password"
                >
                <label for="dava-app-password">Password</label>
            </div>

            <button
                    class="btn sign-up__signup-btn"
                    @click="signUp"
            >
                Sign Up
            </button>
            <button
                    class="btn sign-up__back-btn"
                    @click="back"
            >
                back
            </button>

        </div>
    </div>
</template>

<script>
    // Mixins
    import {inputValidation} from "../mixins/inputValidation";

    export default {
        name: 'sign-up',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            back() {
                this.$emit('backToLogIn');
            },
            signUp() {

                if (this.userNameValidation() && this.passwordValidation()) {
                    this.$store.dispatch('signUp', {
                        username: this.username,
                        password: this.password
                    })
                }
                else {
                    this.$emit('signUpValidationFailed');
                }

            }
        },
        mixins: [
            inputValidation
        ]
    }
</script>

<style lang="scss" scoped>

    .sign-up {

        &__title {
            padding-bottom: 15px;
        }

        &__modal {

            margin-top: 10%;
            border-radius: 5px;
            background-color: transparentize($black, .5);
            color: $white-almost;
            padding: 2%;

            label {
                color: transparentize($white-almost, .5) !important;
            }
        }

        &__signup-btn {

            background-color: $black;
            color: $white-almost;
            width: 49%;
            float: left;

            &:hover {
                background-color: lighten($black, 15%);
            }
        }

        &__back-btn {

            background-color: transparentize($black, .5);
            color: $white-almost;
            width: 49%;
            float: right;

            &:hover {
                background-color: lighten(transparentize($black, .5), 15%);
            }
        }

    }

</style>