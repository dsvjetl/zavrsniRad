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
    }

};

const actions = {

    updateCurrentUser(context, payload) {

        const googleUser = payload.googleUser;

        localStorage.zavrsniRadUser = JSON.stringify(googleUser);

        Vue.http.post(context.rootGetters.login, {
            firstName: googleUser.firstName,
            lastName: googleUser.lastName,
            googleId: googleUser.googleId
        })
            .then(response => response.json())
            .then(response => {

                console.log(response);

                context.commit('updateCurrentUser', {
                    currentUser: googleUser
                });

                EventBus.$emit('userUpdated');

            }, error => {
                console.error(error);
            });

    }

};

export const users = {
    state,
    getters,
    mutations,
    actions
};
