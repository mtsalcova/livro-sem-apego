
<template lang="jade">

    form.form-styl( method = 'post' @submit.prevent="sendPassword" )

        label.field-box
            span.name E-mail: *
            input( v-validate="'required|email'" v-model = "email" v-bind:class="{'-invalid': errors.has('email') }" name = "email" type="text" class="field" )
            p.error( v-if="errors.has('email')" ) Digite um e-mail válido.

        button.btn-main.-full( v-bind:class="{ sending: btnActive}" type="submit" ) {{ btnText }}

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
                    
                    let obj = {}
                    obj.user = this.user
                    
                    this.btnText = 'Enviando...'
                    this.btnActive = true
                    
                    this.sentSuccess()

                }).catch(() => {});

            },
            
            sentSuccess() {

                this.btnActive = false
                this.btnText = 'Enviar'
                alert('enviado!')

            }
        }

    }
</script>



