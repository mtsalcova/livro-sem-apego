
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
                auth.logout();
            }

        }

    }

</script>
