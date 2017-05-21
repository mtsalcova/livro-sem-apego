

import Vue from 'vue'

// Components
import BtnMyAccount from './components/BtnMyAccount.vue'
import PanelAside from './components/PanelAside.vue'
import PanelDashboard from './components/PanelDashboard.vue'
import PanelDonatedBooks from './components/PanelDonatedBooks.vue'
import PanelProfile from './components/PanelProfile.vue'
import PanelRegisterBook from './components/PanelRegisterBook.vue'
import PanelEditBook from './components/PanelEditBook.vue'
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
Vue.component('BtnMyAccount', BtnMyAccount)
Vue.component('PanelAside', PanelAside)
Vue.component('PanelDashboard', PanelDashboard)
Vue.component('PanelDonatedBooks', PanelDonatedBooks)
Vue.component('PanelProfile', PanelProfile)
Vue.component('PanelRegisterBook', PanelRegisterBook)
Vue.component('PanelEditBook', PanelEditBook)
Vue.component('CreateAccount', CreateAccount)
Vue.component('Login', Login)
Vue.component('FilterBooks', FilterBooks)
Vue.component('ListBooks', ListBooks)
Vue.component('SendPassword', SendPassword)


new Vue({
    el: '.container'
})
