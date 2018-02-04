const state = {

    baseUrl: 'http://localhost/zavrsni/requests/'

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