<template>
    <div class="login">
        <div class="row">
            <transition
                    name="fade" mode="out-in"
            >
                <div
                        class="login__modal col s12 l4 offset-l4"
                        v-if="currentModal === 'login'"
                >

                    <h5 class="login__title">
                        Log in
                    </h5>

                    <div>
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
                    </div>

                    <button
                            class="btn login__submit-btn"
                            @click="checkLogin"
                    >
                        {{ loginBtnMsg }}
                    </button>
                    <button
                            class="btn login__signup-btn"
                            :class="{'sign-up': currentModal === 'signUp'}"
                            @click="signUp"
                    >
                        Sign Up
                    </button>

                </div>

                <login-failed
                        v-if="currentModal === 'loginFailed'"
                        :loginFailMessage="loginFailMessage"
                        @backToLogin="currentModal = 'login'"
                ></login-failed>

                <sign-up
                        v-if="currentModal === 'signUp'"
                        @backToLogIn="currentModal = 'login'"
                        @signUpValidationFailed="signUpFail"
                ></sign-up>

            </transition>
        </div>
    </div>
</template>

<script>
    // Components
    import SignUp from '@/components/SignUp';
    import LoginFailed from '@/components/LoginFailed';

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
                    clientSide: 'Korisničko ime mora sadržavati najmanje 4 znaka, dok se lozinka mora sastojati od najmanje 8 znakova, uzimajući u obzir da najmanje 4 znaka moraju biti brojevi!',
                    serverSide: 'Korisnik sa tim korisničkim imenom već postoji, ili ste unijeli krivu lozinku!'
                },
                username: '',
                password: ''
            }
        },
        computed: {
            loginBtnMsg() {

                switch (this.currentModal) {
                    case 'login':
                        return 'Log in';
                        break;
                    case 'loginFailed':
                        return 'Shvaćam';
                        break;
                    case 'signUp':
                        return 'Back';
                        break;
                }

            }
        },
        methods: {
            checkLogin() {
                this.currentModal === 'login' ? this.login() : this.currentModal = 'login';
            },
            login() {

                if (this.passwordValidation() && this.userNameValidation()) {

                    this.$store.dispatch('updateCurrentUser', {
                        username: this.username,
                        password: this.password
                    });

                } else {

                    this.loginFailMessage = this.loginFailMessages.clientSide;
                    this.currentModal = 'loginFailed';

                }

            },
            signUpFail() {

                this.loginFailMessage = this.loginFailMessages.clientSide;
                this.currentModal = 'loginFailed';

            },
            signUp() {

                if (this.currentModal === 'signUp') {

                } else if (this.currentModal === 'login' || this.currentModal === 'loginFailed') {
                    this.currentModal = 'signUp';
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
        ],
        components: {
            SignUp,
            LoginFailed
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .login {

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

        &__submit-btn {

            background-color: $black;
            color: $white-almost;
            width: 49%;
            float: left;

            &:hover {
                background-color: lighten($black, 15%);
            }
        }

        &__signup-btn {

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
