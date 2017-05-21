
<template lang="jade">
    
    .donated-book
        .image: img( :src = 'image' v-if = 'image'  )
        .infos
            h2.name {{ title }}
            h3.author {{ author }}
            p Contatos Recebidos: <strong>{{ contacts }}</strong>
            p Data do Cadastro: <strong>{{ date }}</strong>

            .status-book
                p Mostrar no site:
                .status( @click = 'setStatusBook' )
                    input( :checked = "status == 1" v-bind:value="id" type = 'checkbox' id = 'status'  )
                    label( for = 'status' )
        
        a.btn-main( v-bind:href = 'link' ) + Informações
    


</template>


<script>
    
    import auth from '../../auth'

    export default {
        props: ['id', 'title', 'author', 'contacts', 'date', 'image', 'link', 'status'],

        data() {
            return {
                checkedInput: false
            }
        },
        methods: {

            setStatusBook(e) {
                var status = e.target;
                var checked = 0;
                if( status.checked ) checked = 1;

                var frm = new FormData();
                frm.append( 'status', checked );
                frm.append( 'book_id', status.value );

                var url = window.APIUrl + '/book/status';
                this.$http.post(url, frm, {headers: auth.getAuthHeader()});

            }
        }
    }



</script>
