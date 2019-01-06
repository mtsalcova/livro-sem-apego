
<template lang="pug">

    form.form-styl.mt20( method = 'POST' data-form = 'sendContact' @submit.prevent="sendContact" )

        label.field-box
            span.name Nome:
            input.field( 
                v-validate="'required'" 
                type = 'text' 
                name = 'name'
                v-bind:class="{'-invalid': errors.has('name') }" )
            p.error( v-if="errors.has('name')" ) Esse campo é obrigatório
            
        label.field-box
            span.name E-mail:
            input.field( 
                v-validate="'required|email'" 
                type = 'email' 
                name = 'email'
                v-bind:class="{'-invalid': errors.has('email') }" )
            p.error( v-if="errors.has('email')" ) Digite um e-mail válido.

        label.field-box
            span.name Mensagem: * <i>(Máximo de 225 Caracteres)</i>
            textarea.field( 
                v-validate="'required|max:225'" 
                name = 'message'
                v-bind:class="{'-invalid': errors.has('message') }" )
            p.error( v-if="errors.has('message')" ) Esse campo é obrigatório.
            

        button.btn-main( v-bind:class="{ '-sending': btnActive}" type="submit" ) {{ btnText }}


</template>


<script>

    export default {
        
        data() {
            return {
                btnText: 'Enviar',
                btnActive: false
            }
        },

        methods: {

            sendContact() {

                this.$validator.validateAll().then((result) => {

                    if( !result ) return false;
                    
                    this.btnText = 'Enviando...';
                    this.btnActive = true;

                    var frm = document.querySelector('[data-form=sendContact]');
                    var data = new FormData(frm)

                    var request = this.$http.post( window.APIUrl + '/contact', data);
                    request.then( (obj) => {
                        obj.json().then( (rs) => {
                            
                            if(rs.sent) this.setSuccess(frm );
                            else this.setError();

                        }).catch( () => {this.setError()});
                    }).catch( () => {this.setError()});


                    
                }).catch(() => {});

            },

            setError() {
                this.btnText = 'Ocorreu um erro ao enviar! :/';
                this.resetFrm();
            },

            setSuccess(frm) {
                this.btnText = 'Contato enviado com sucesso, obrigado! :)'
                frm.reset();
                this.resetFrm();
            },

            resetFrm() {

                var self = this;
                setTimeout(() => {
                    self.btnActive = false;
                    self.btnText = 'Enviar'
                }, 3000);

            }


        }

 

    }

</script>
