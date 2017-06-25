

<template lang="pug">

    .grid-books.-home

        book-box( v-if = "books" v-for = "book in books"
            :title = 'book.title',
            :author = 'book.author',
            :image = 'book.image',
            :state = 'book.state',
            :link = 'book.link'
        )

        p( v-if = "books == false"  ) Ops, não encontramos nenhum livro cadastrado para doação :(

</template>

<script>
    
    import BookBox from './reusable/BookBox.vue'

    export default {

        name: 'latest-books',
        components: {
            'book-box': BookBox
        },

        data() {
            return {
                books: true
            }
        },

        created() {

            var request = this.$http.get( window.APIUrl + '/book/latest');

            request.then( (objs) => {
                objs.json().then( (json) => {
                    this.books = json.books
                });
            });

        }

    }

</script>
