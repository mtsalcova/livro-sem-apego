

<template lang="pug">

    aside.filter: form.form-styl.-nobrd( method = 'POST' )
    
        label.field-box
            span.name Título do Livro:
            input.field( type = 'text' name = 'title' )
        
        label.field-box
            span.name Autor:
            input.field( type = 'text' name = 'author' )

        label.field-box
            span.name Ano:
            input.field( type = 'text' name = '' )

        label.field-box
            span.name Genêro:
            select.field( name = 'author' )
                option( value = '' ) Infantil

        label.field-box
            span.name Editora:
            select.field( name = 'editora' )
                option( value = '' ) Saraiva

        label.field-box
            span.name Estado
            select.field( name = 'state' )
                option( value = '' ) 
                option( value = '' ) SP

        button.btn-main.-full Filtrar

</template>


<script>

    export default {
        

    }

</script>
