// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from "./store/store";
import VueResource from 'vue-resource';

// Exports
export const EventBus = new Vue();

// Config
Vue.config.productionTip = false;
Vue.use(VueResource);

// Google authorization / login
import GoogleAuth from 'vue-google-auth';

Vue.use(GoogleAuth, {clientId: '619965342088-lp87el7h3g7kmlq3p99lebgbanl41rvt.apps.googleusercontent.com'});
Vue.googleAuth().load();
Vue.googleAuth().directAccess();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
