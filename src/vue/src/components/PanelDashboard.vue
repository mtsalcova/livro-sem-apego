
<template lang="pug">
    
    main.content

        .header-panel
            h1.title <span>Seja Bem vindo</span>, {{nameuser}}!
            p.desc Aqui você terá acesso as suas informações de perfil, cadastrar livros para doação, entre outras coisas! :)

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
                :status = 'book.status',
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
                nameuser: '',
                books: []
            }

        },

        created() {
            
            let user_id = localStorage.getItem('id_token');
            this.$http.get( window.APIUrl + '/user/' + user_id, {headers: auth.getAuthHeader()})
                .then( 
                    success => {this.setData(success)}
                    , error => { if( error.status === 401 ) auth.logout(); }
                );
            
            // Latest Books
            let latest = this.$http.get( window.APIUrl + '/book/donated/latest', {headers: auth.getAuthHeader()});
            latest.then( success => { 

                var objs = success.json();
                objs.then( (objs) => { 
                    if( objs.books.length ) {
                        this.books = objs.books 
                    }
                });
                objs.catch( (error) => { if( error.status === 401 ) auth.logout() });
            
            });
                
            latest.catch((error) => { if( error.status === 401 ) auth.logout() });

        }, 

        methods: {

            setData(data) {
                data.json().then(success => {
                    this.nameuser = success.user.name;
                }, error => { if( error.status === 401 ) auth.logout() });
            }

        }

    }

</script>
