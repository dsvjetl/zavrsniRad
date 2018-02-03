import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

    allSongs: [],
    currentUserGrade: 0,
    averageGrade: 0

};

const getters = {

    allSongs(state) {
        return state.allSongs;
    },
    currentUserGrade(state) {
        return state.currentUserGrade;
    },
    averageGrade(state) {
        return state.averageGrade;
    }

};

const mutations = {

    getAllSongs(state, payload) {
        state.allSongs = payload.songs;
    },
    updateCurrentUserGrade(state, payload) {
        state.currentUserGrade = payload.currentUserGrade;
    },
    updateAverageGrade(state, payload) {
        state.averageGrade = payload.averageGrade;
    }

};

const actions = {

    getAllSongs(context) {

        Vue.http.get(context.rootGetters.getAllSongs)
            .then(response => response.json())
            .then(response => {

                context.commit('getAllSongs', {
                    songs: response.songs
                });

            }, error => {
                console.error(error);
            });

    },

    gradeSong(context, payload) {

        const grade = payload.count;
        const songId = payload.songId;
        const currentUser = context.rootGetters.currentUser;

        const gradeSongRequest = {
            userId: currentUser.id,
            songId,
            grade
        };

        Vue.http.post(context.rootGetters.gradeSong, gradeSongRequest)
            .then(response => response.json())
            .then(response => {
                console.log(response);
            }, error => {
                console.error(error);
            });

    },

    getSongGrades(context, payload) {

        const songId = payload.songId;
        const userId = context.rootGetters.currentUser.id;

        const request = {
            songId,
            userId
        };

        console.log(request);

        Vue.http.get(`${context.rootGetters.getSongGrades}?userId=${userId}&songId=${songId}`)
            .then(response => response.json())
            .then(response => {

                console.log(response);

                context.commit('updateCurrentUserGrade', {
                    currentUserGrade: response.currentUserGrade
                });

                context.commit('updateAverageGrade', {
                    averageGrade: response.averageGrade
                });

            }, error => {
                console.error(error);
            });

    }

};

export const songs = {
    state,
    getters,
    mutations,
    actions
};