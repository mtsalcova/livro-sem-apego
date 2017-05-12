

<template lang="jade">

    .donated-books

        h2.title Últimos livros cadastrados:
        //- p.nobooks Ops, não encontramos nenhum livro cadastrado. <a>Clique aqui</a> para fazer sua primeira doação :)

        donated-book

</template>


<script>
    
    import auth from '../auth'
    import DonatedBook from './reusable/DonatedBook.vue'

    export default {

        beforeCreate() {
            auth.checkAuth();
        },

        components: {
            'donated-book': DonatedBook
        },
        

        created() {
            
            // this.$http.get('http://localhost/api/users', {headers: auth.getAuthHeader()}).then( rs => {
            //     console.log(rs);
            // }, error => {

            // });

        }


    }

</script>
