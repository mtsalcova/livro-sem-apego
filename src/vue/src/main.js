
import Vue from 'vue'
import VueResource from 'vue-resource'
import Login from './components/Login.vue'
import FilterBooks from './components/FilterBooks.vue'
import ListBooks from './components/ListBooks.vue'

Vue.use(VueResource)
Vue.component('Login', Login)
Vue.component('FilterBooks', FilterBooks)
Vue.component('ListBooks', ListBooks)

new Vue({
    el: '.container'
})
