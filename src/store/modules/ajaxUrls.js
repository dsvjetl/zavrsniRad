const state = {

    baseUrl: 'http://localhost/zavrsni/requests/'

};

const getters = {

    login(state) {
        return `${state.baseUrl}login.php`;
    },
    signUp(state) {
        return `${state.baseUrl}signUp.php`;
    }

};

export const ajaxUrls = {
    state,
    getters
};