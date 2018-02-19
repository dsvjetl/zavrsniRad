import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import {EventBus} from "../../main";

const state = {

    currentUser: {
        firstName: '',
        lastName: '',
        id: null,
        googleId: ''
    }

};

const getters = {

    currentUser(state) {
        return state.currentUser;
    }

};

const mutations = {

    updateCurrentUser(state, payload) {
        state.currentUser = payload.currentUser;
    },
    signOut(state) {
        state.currentUser = {};
    }

};

const actions = {

    updateCurrentUser(context, payload) {

        const googleUser = payload.googleUser;

        localStorage.zavrsniRadUser = JSON.stringify(googleUser);

        const request = {
            firstName: googleUser.firstName,
            lastName: googleUser.lastName,
            googleId: googleUser.googleId
        };

        Vue.http.post(context.rootGetters.login, request)
            .then(response => response.json())
            .then(response => {

                console.log(response);

                context.commit('updateCurrentUser', {
                    currentUser: response
                });

                EventBus.$emit('userUpdated');

            }, error => {
                console.error(error);
            });

    },

    signOut(context) {
        context.commit('signOut');
        localStorage.removeItem('zavrsniRadUser');
    }

};

export const users = {
    state,
    getters,
    mutations,
    actions
};
