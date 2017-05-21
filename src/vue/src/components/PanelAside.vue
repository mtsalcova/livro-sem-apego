
<template lang="pug">

    aside.sidebar

        strong.btn Menu

        nav.sidebar-nav
            a.baritem( href = 'painel' ) Início
            a.baritem( href = 'painel/perfil' ) Editar Cadastro
            a.baritem( href = 'painel/livros' ) Livros
            a.baritem( @click = "logoutUser" ) Sair

</template>


<script>

    import auth from '../auth'

    export default {

        methods: {

            logoutUser() {

                var logout = this.$http.get( window.APIUrl + '/user/logout', {headers: auth.getAuthHeader()});
                logout.then( () => { auth.logout() });

            }

        }

    }

</script>
