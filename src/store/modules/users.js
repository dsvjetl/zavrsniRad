import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import {EventBus} from "../../main";

const state = {

    currentUser: {}

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

        console.log(context.rootGetters);

        Vue.http.post(context.rootGetters.login, {
            username: payload.username,
            password: payload.password
        })
            .then(response => response.json())
            .then(response => {
                handleUsersResponse(response);
            }, error => {
                console.error(error);
            });

        const handleUsersResponse = response => {

            console.log(response);

            if (response.status === false) {

                EventBus.$emit('userAlreadyExists');

            } else if (response.status === true) {

                context.commit('updateCurrentUser', {
                    currentUser: response.currentUser
                });

                EventBus.$emit('userActivated');

            }
        }
    },
    signUp(context, payload) {

        console.log(context.rootGetters);

        Vue.http.post(context.rootGetters.signUp, {
            username: payload.username,
            password: payload.password
        })
            .then(response => response.json())
            .then(response => {
                handleUsersResponse(response);
            }, error => {
                console.error(error);
            });

        const handleUsersResponse = response => {

            console.log(response);

            if (response.status === false) {

                EventBus.$emit('userAlreadyExists');

            } else if (response.status === true) {

                context.commit('updateCurrentUser', {
                    currentUser: response.currentUser
                });

                EventBus.$emit('userActivated');

            }
        }
    }

};

export const users = {
    state,
    getters,
    mutations,
    actions
};
