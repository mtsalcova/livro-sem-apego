

<template lang="jade">
    
    main.content

        .header-panel
            h1.title <span>Seja Bem vindo</span>, {{nameuser}}!
            p.desc Aqui você terá acesso as suas informações de perfil, cadastrar livros para doação, entre outras coisas! :)

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
            if( !auth.user.authenticated ) location.href = './login'
        },

        components: {
            'donated-book': DonatedBook
        },

        data() {
            return {
                nameuser: false
            }

        },

        created() {
            
            let user_id = localStorage.getItem('id_token');
            this.$http.get('http://localhost/api/user/'+user_id, 
                {
                    headers: auth.getAuthHeader()
                
                }).then( success => {
                    this.setData(success);

                }, error => { 
                    if( error.status === 401 ) auth.logout();
                }
            );

        }, 

        methods: {

            setData(data) {
                data.json().then(success => {
                    this.nameuser = success.user.name;
                }, error => {
                    console.log(error)
                });
            }

        }

    }

</script>
