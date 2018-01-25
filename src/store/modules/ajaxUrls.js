const state = {

    baseUrl: 'http://localhost/zavrsni/requests/'

};

const getters = {

    login(state) {
        return `${state.baseUrl}login.php`;
    },
    getAllSongs(state) {
        return `${state.baseUrl}getAllSongs.php`;
    }

};

export const ajaxUrls = {
    state,
    getters
};