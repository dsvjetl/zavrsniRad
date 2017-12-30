import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import {EventBus} from "../../main";

const state = {

    users: [],
    urls: {
        login: 'http://localhost/zavrsni/requests/login.php'
    }

};

const getters = {

    users(state) {
        return state.users;
    },
    urls(state) {
        return state.urls;
    }

};

const mutations = {

    updateUsers(state, payload) {
        state.users = payload.users;
    }

};

const actions = {

    updateUsers(context, payload) {

        Vue.http.post(context.state.urls.login, payload.users)
            .then(response => response.json())
            .then(response => {
                handleUsersResponse(response);
            }, error => {
                console.error(error);
            });

        const handleUsersResponse = response => {

            console.log(response);

            if (response.status === false) {

                switch (response.desc) {

                    case 'USER_ALREADY_EXISTS_OR_WRONG_PASSWORD':
                        EventBus.$emit('userAlreadyExists');
                        break;

                }

            }
            else if (response.status === true) {

                console.log('Logged in!');

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
