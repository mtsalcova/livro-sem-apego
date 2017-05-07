
<template lang="jade">

    .donated-book
        .image: img( src = 'img/books/cover.jpg' )
        .infos
            h2.name O Mundo de Sofia
            h3.author Jostein Gaarder
            p Contatos Enviados: <strong>12</strong>
            p Data do Cadastro: <strong>21/04/2017</strong>

            .status-book
                p Mostrar no site:
                .status
                    input( type = 'checkbox' id = 'status' )
                    label( for = 'status' )
        
        a.btn-main( href = '' ) + Informações
        
</template>


<script>
    
    export default {
        
    }

</script>
