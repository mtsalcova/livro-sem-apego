

<template lang="pug">

    main.content

        .header-panel
            a.btn-main( href = 'painel/livros/doar-livros' ) + Doar Livros
            h1.title Livros
            p.desc Listagem de livros cadastrados para doação.

        .donated-books
            h2.title Últimos livros cadastrados:
            
            donated-book( v-if = "books" v-for = "book in books",
                :id = 'book.id', 
                :title = 'book.title', 
                :author = 'book.author',  
                :contacts = 'book.contacts',
                :date = 'book.date', 
                :image = 'book.image',
                :link = 'book.link',
                :status = 'book.status'
            )

            p.nobooks( v-if = "books == false" ) Ops, não encontramos nenhum livro cadastrado. <a href = 'painel/livros/doar-livros'>Clique aqui</a> para fazer sua primeira doação :)


</template>

<script>

    import auth from '../auth'
    import DonatedBook from './reusable/DonatedBook.vue'

    export default {

        beforeCreate() {
            auth.checkAuth();
            if( !auth.user.authenticated ) location.href = './login'
        },

        components: {
            'donated-book': DonatedBook
        },

        data() {
            return {
                books: []
            }

        },

        created() {
            
            let latest = this.$http.get( window.APIUrl + '/book/donated', {headers: auth.getAuthHeader()});
            latest.then( success => { 

                var objs = success.json();
                objs.then( (objs) => { this.books = objs.books } );
                objs.catch( (error) => { if( error.status === 401 ) auth.logout() });
            
            });
                
            latest.catch((error) => { if( error.status === 401 ) auth.logout() });

        }

    }
    
</script>
