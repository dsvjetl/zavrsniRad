const state = {

    baseUrl: 'http://localhost/zavrsni/requests/', // for dev!
    // baseUrl: 'http://domagoj-svjetlicic.000webhostapp.com/back/requests/'

};

const getters = {

    login(state) {
        return `${state.baseUrl}login.php`;
    },
    getAllSongs(state) {
        return `${state.baseUrl}getAllSongs.php`;
    },
    gradeSong(state) {
        return `${state.baseUrl}gradeSong.php`;
    },
    getSongGrades(state) {
        return `${state.baseUrl}getSongGrades.php`;
    },
    getSongComments(state) {
        return `${state.baseUrl}getSongComments.php`;
    },
    commentSong(state) {
        return `${state.baseUrl}commentSong.php`;
    }

};

export const ajaxUrls = {
    state,
    getters
};