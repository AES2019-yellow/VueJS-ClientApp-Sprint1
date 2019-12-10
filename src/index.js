import Vue from 'vue';
import VeeValidate from 'vee-validate';
import BootstrapVue from "bootstrap-vue";
import Axios from 'axios';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(VeeValidate);
Vue.use(BootstrapVue);


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});