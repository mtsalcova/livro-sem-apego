

import Vue from 'vue'


// Components
import PanelDashboard from './components/PanelDashboard.vue'
import CreateAccount from './components/CreateAccount.vue'
import Login from './components/Login.vue'
import SendPassword from './components/SendPassword.vue'
import FilterBooks from './components/FilterBooks.vue'
import ListBooks from './components/ListBooks.vue'


// Plugins
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)


// Global Components
Vue.component('PanelDashboard', PanelDashboard)
Vue.component('CreateAccount', CreateAccount)
Vue.component('Login', Login)
Vue.component('FilterBooks', FilterBooks)
Vue.component('ListBooks', ListBooks)
Vue.component('SendPassword', SendPassword)

new Vue({
    el: '.container'
})
