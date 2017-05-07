

<template lang="jade">

    .donated-books

        h2.title Últimos livros cadastrados:
        //- p.nobooks Ops, não encontramos nenhum livro cadastrado. <a>Clique aqui</a> para fazer sua primeira doação :)

        donated-book

</template>


<script>
    
    import auth from '../auth'
    import DonatedBook from './DonatedBook.vue'

    export default {

        beforeCreate() {
            if(!auth.user.authenticated) window.location = './login'
        },
        name: 'panel-dashboard',
        components: {
            'donated-book': DonatedBook
        }


    }

</script>
