import axios from 'axios'
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import SweetAlert from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome'
})
Vue.use(SweetAlert)
Vue.use(VueRouter)
Vue.component('navigation', require('./components/Navigation.vue').default);

const app = new Vue({
    el: '#app',
    router: new VueRouter(routes)
});
