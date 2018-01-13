import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

    songs: []

};

const getters = {

    songs(state) {
        return state.songs;
    }

};

const mutations = {

    getSongs(state, payload) {
        state.songs = payload.songs;
    }

};

const actions = {



};