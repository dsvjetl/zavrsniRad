<template>
    <div class="login">
        <div class="row">
            <div class="login-google">
                <button
                        class="login__google-login-btn"
                        @click="googleSignIn"
                >
                    <img
                            src="../../assets/icons/google.png" alt="Google icon"
                            class="login__google-icon"
                    >
                    <span>
                        Sign in!
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',

        methods: {

            // Google login
            googleSignIn(googleUser) {

                this.$googleAuth().signIn(googleUser => {

                    const firstName = googleUser.w3.ofa;
                    const lastName = googleUser.w3.wea;
                    const googleId = googleUser.w3.Eea;

                    const currentUser = {
                        firstName,
                        lastName,
                        googleId
                    };

                    this.$store.dispatch('updateCurrentUser', {
                        googleUser: currentUser
                    });

                }, error => {
                    console.error(error);
                });

            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .login {

        &__google-login-btn {

            border-radius: 5px;
            margin: 20% auto;
            display: block;
            padding: 10px 15px;
            transition: all .3s ease-in-out;
            background-color: $white-almost;

            span {
                float: right;
                padding-left: 10px;
                font-size: 20px;
                line-height: 40px;
            }

            &:hover {
                transform: scale(1.1);
                background-color: $black;
                color: $white-almost;
            }

        }

        &__google-icon {
            width: 40px;
            float: left;
        }

    }

</style>
