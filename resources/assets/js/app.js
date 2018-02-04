
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const Navbar = Vue.component('Navbar', require('./components/Navbar.vue'));
const Flooter = Vue.component('Flooter', require('./components/Flooter.vue'));
const Home = Vue.component('Home', require('./components/Home.vue'));
const Add = Vue.component('Add', require('./components/Add.vue'));
const Show = Vue.component('Show', require('./components/Show.vue'));
const Edit = Vue.component('Edit', require('./components/Edit.vue'));


const routes = [
    {
        path: '/home',
        component: Home
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes: routes
})

const app = new Vue({
    el: '#app',
    router: router
});
