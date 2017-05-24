

<template lang="pug">

    .list-books

        .title-list
            span Listando {{ booksTotal }} livro(s).

        .gridbooks

            book-box( v-if = "books" v-for = "book in books"
                :title = 'book.title',
                :author = 'book.author',
                :image = 'book.image',
                :state = 'book.state',
                :link = 'book.link'
            )

            p( v-if = "books == false"  ) Ops, não encontramos nenhum livro cadastrado para doação :(

        .pages-box( style = 'display: none' )
            a.btn-main.-disabled Anterior
            .pages
                input( type = 'text' name = 'page' value = '1' )
                span de 2
            a.btn-main Próximo

</template>


<script>

    import BookBox from './reusable/BookBox.vue'

    export default {

        components: {
            'book-box': BookBox
        },

        data() {
            return {
                booksTotal: 0,
                books: false
            }
        },

        created() {

            let request = this.$http.get( window.APIUrl + '/book/load');

            request.then( (objs) => {
                objs.json().then( (json) => {
                    this.books = json.books
                    this.booksTotal = json.books.length
                });
            });


        }

    }


</script>
