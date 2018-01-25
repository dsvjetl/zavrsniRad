export const localStorageLogin = {

    methods: {

        saveToLocalStorage() {

            if (localStorage.zavrsniRadUser === 'undefined' || localStorage.zavrsniRadUser === 'false' || localStorage.zavrsniRadUser === undefined) {

                console.error('zavrsniRadUser not saved in local storage!');
                this.$router.push('/');

            }
            else {

                const googleUser = JSON.parse(localStorage.zavrsniRadUser);

                this.$store.dispatch('updateCurrentUser', {
                    googleUser
                });

            }

        }

    },

    created() {

        if (typeof(Storage) !== "undefined") {
            this.saveToLocalStorage();
        } else {
            console.error('Local storage not supported!');
        }

    }

};