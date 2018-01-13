import Vue from 'vue';
import Vuex from 'vuex';

// Mutations
import {ajaxUrls} from "./modules/ajaxUrls";
import {users} from "./modules/users";

Vue.use(Vuex);

export const store = new Vuex.Store({
    namespaced: true,
    modules: {
        ajaxUrls,
        users
    }
});