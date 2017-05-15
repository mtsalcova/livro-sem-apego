
<template lang="jade">

    form.form-styl( method = 'post' @submit.prevent="sendPassword" )

        label.field-box
            span.name E-mail: *
            input( v-validate="'required|email'" v-model = "email" v-bind:class="{'-invalid': errors.has('email') }" name = "email" type="text" class="field" )
            p.error( v-if="errors.has('email')" ) Digite um e-mail válido.

        button.btn-main.-full( v-bind:class="{ '-sending': btnActive}" type="submit" ) {{ btnText }}

</template>


<script>

    export default {

        data() {
            return {
                email: '',
                btnText: 'Enviar',
                btnActive: false
            }
        },

        methods: {
            
            sendPassword() {

                this.$validator.validateAll().then(() => {
                    
                    this.btnText = 'Enviando...';
                    this.btnActive = true;

                    var obj = new FormData();
                    obj.append('email', this.email);
                    
                    this.sendEmail(obj);

                }).catch(() => {});

            },

            sendEmail(obj) {

                this.$http.post('http://localhost/api/user/forget-password', obj).then(rs => {
                    rs.json().then( data => {
                        if( data.error ) this.error(data.error)
                        else this.success();
                    }, () => { this.error(false) });
                }, () => { this.error(false) });
            
            },
            
            success() {

                this.btnText = 'E-mail enviado com sucesso!'
                this.btnActive = false;
                this.reset(); 
                
                

            },

            error(msg) {
                
                if( !msg ) msg = 'Ocorreu um erro inesperado.'
                this.btnText = msg;
                this.reset();
                
            },

            reset() {

                setTimeout(() => {
                    this.btnActive = false;
                    this.btnText = 'Enviar';
                }, 3000);

            }
        }

    }
</script>



