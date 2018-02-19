const state = {

    baseUrl: 'http://localhost/zavrsni/requests/', // for dev!
    // baseUrl: 'https://domagoj-svjetlicic.xyz/back/requests/' // https
    // baseUrl: 'http://domagoj-svjetlicic.from.hr/back/requests/'

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