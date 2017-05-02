
import Vue from 'vue'
import VueResource from 'vue-resource'
import Login from './components/Login.vue'

Vue.use(VueResource)

Vue.component('Login', Login)  

new Vue({
    el: '.container'
})
