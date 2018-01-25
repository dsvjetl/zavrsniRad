import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

    allSongs: []

};

const getters = {

    allSongs(state) {
        return state.songs;
    }

};

const mutations = {

    getAllSongs(state, payload) {
        state.songs = payload.songs;
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

    }

};

export const songs = {
    state,
    getters,
    mutations,
    actions
};