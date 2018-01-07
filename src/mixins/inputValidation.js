export const inputValidation = {

    methods: {

        userNameValidation() {

            return this.username.length >= 4 ? true : false;

        },
        passwordValidation() {

            const isNumberInPassword = Array.from(this.password).filter(char => !isNaN(char)).length > 0;

            let numbers = isNumberInPassword ? this.password.match(/\d/g).join('') : '';

            return this.password.length >= 8 && numbers.length >= 4 && numbers.length < this.password.length ?
                true :
                false;

        }

    }

};