

<template lang="jade">

    .list-books

        .title-list
            span Listando 20 de 40 livros.

        .gridbooks
            book-box


        .pages-box
            a.btn-main.-disabled Anterior
            .pages
                input( type = 'text' name = 'page' value = '1' )
                span de 2

            a.btn-main Próximo



</template>


<script>

    import BookBox from './BookBox.vue'

    export default {

        components: {
            'book-box': BookBox
        }

    }


</script>
