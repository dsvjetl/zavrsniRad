import Vue from 'vue';
import VueResource from 'vue-resource';

import {EventBus} from "../../main";

Vue.use(VueResource);

const state = {

    allSongs: [],
    currentUserGrade: 0,
    averageGrade: 0,
    songComments: []

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
    },
    songComments(state) {
        return state.songComments;
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
    },
    updateSongComments(state, payload) {
        state.songComments = payload.songComments;
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

        if (!userId) {
            return;
        }

        const request = {
            songId,
            userId
        };

        Vue.http.get(`${context.rootGetters.getSongGrades}?userId=${userId}&songId=${songId}`)
            .then(response => response.json())
            .then(response => {

                context.commit('updateCurrentUserGrade', {
                    currentUserGrade: response.currentUserGrade
                });

                context.commit('updateAverageGrade', {
                    averageGrade: response.averageGrade
                });

                EventBus.$emit('updateStarsOnStart', response.currentUserGrade);

            }, error => {
                console.error(error);
            });

    },

    updateSongComments(context, payload) {

        const songId = payload.songId;

        Vue.http.get(`${context.rootGetters.getSongComments}?songId=${songId}`)
            .then(response => response.json())
            .then(response => {

                context.commit('updateSongComments', {
                    songComments: response.data
                });

            }, error => {
                console.error(error);
            });

    },

    commentSong(context, payload) {

        const songId = payload.songId;
        const comment = payload.comment;
        const userId = context.rootGetters.currentUser.id;

        const request = {
            songId,
            comment,
            userId
        };

        Vue.http.post(context.rootGetters.commentSong, request)
            .then(response => response.json())
            .then(response => {

                context.dispatch('updateSongComments', {
                    songId
                });

                EventBus.$emit('newCommentAdded');

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