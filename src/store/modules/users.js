import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import {EventBus} from "../../main";

const state = {

    currentUser: {},
    urls: {
        login: 'http://localhost/zavrsni/requests/login.php'
    }

};

const getters = {

    currentUser(state) {
        return state.currentUser;
    },
    urls(state) {
        return state.urls;
    }

};

const mutations = {

    updateCurrentUser(state, payload) {
        state.currentUser = payload.currentUser;
    }

};

const actions = {

    updateCurrentUser(context, payload) {

        console.log(context.getters.urls.login);

        Vue.http.post(context.getters.urls.login, {
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
