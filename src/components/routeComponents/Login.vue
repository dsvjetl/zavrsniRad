<template>
    <div class="login">
        <div class="row">
            <transition name="fade" mode="out-in">

                <div
                        class="login__modal col s12 l4 offset-l4"
                        v-if="currentModal === 'login'"
                        key="login"
                >
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
                            class="btn login__submit-btn"
                            @click="login"
                    >
                        Log In
                    </button>
                    <button class="btn login__signup-btn">
                        Sign Up
                    </button>
                </div>

                <div
                        class="login__modal col s12 l4 offset-l4"
                        v-if="currentModal === 'loginFailed'"
                        key="login-fail"
                >

                    <h3>
                        Login Failed!
                    </h3>

                    <p>
                        {{ loginFailMessage }}
                    </p>

                    <button
                            class="btn login__submit-btn"
                            @click="currentModal = 'login'"
                    >
                        Shvatio sam!
                    </button>
                </div>

            </transition>
        </div>
    </div>
</template>

<script>
    // Event Bus
    import {EventBus} from "../../main";

    // Mixins
    import {inputValidation} from "../../mixins/inputValidation";

    export default {
        name: 'login',
        data() {
            return {
                currentModal: 'login',
                loginFailMessage: null,
                loginFailMessages: {
                    clientSide: 'Korisničko ime mora sadržavati najmanje 4 znaka, dok se lozinka mora sastojati od najmanje 8 znakove, uzimajući u obzir da najmanje 4 znaka moraju biti brojevi!',
                    serverSide: 'Korisnik sa tim korisničkim imenom već postoji!'
                },
                username: '',
                password: ''
            }
        },
        methods: {
            login() {

                if (this.passwordValidation() && this.userNameValidation()) {
                    this.$store.dispatch('updateUsers', {
                        users: {
                            username: this.username,
                            password: this.password
                        }
                    });
                }
                else {
                    this.loginFailMessage = this.loginFailMessages.clientSide;
                    this.currentModal = 'loginFailed';
                }

            },
            userAlreadyExists() {

                this.loginFailMessage = this.loginFailMessages.serverSide;
                this.currentModal = 'loginFailed';

            }
        },
        mounted() {
            this.currentModal = 'login';
        },
        created() {
            EventBus.$on('userAlreadyExists', this.userAlreadyExists);
        },
        mixins: [
            inputValidation
        ]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .login {

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

        &__submit-btn {
            background-color: $black;
            color: $white-almost;
        }

        &__signup-btn {
            background-color: transparentize($black, .5);
            color: $white-almost;
        }

    }

</style>
