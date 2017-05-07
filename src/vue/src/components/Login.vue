<template lang="jade">

    form( method="post" class="form-styl" @submit.prevent="sendFormLogin" )
        
        label.field-box
            span.name E-mail: *
            input( v-validate="'required|email'" v-model = "user" v-bind:class="{'-invalid': errors.has('email') }" name = "email" type="email" class="field" )
            p.error( v-if="errors.has('email')" ) Digite um e-mail válido.
        
        label.field-box
            span.name Senha: * <i>(Mínimo 6 caracteres)</i>
            input( v-validate="'required|min:6'" v-bind:class="{'-invalid': errors.has('pass') }" type="password" name = 'pass' v-model="pass" class="field" )
            p.error( v-if="errors.has('pass')" ) Digite uma senha válida.

        button( class="btn-main -full" v-bind:class="{ sending: btnActive}" type="submit" ) {{ btnText }}
        
        a( href="forget-password.html" class="forgetpass" ) Esqueceu sua senha?

</template>

<script>

import auth from '../auth'
    
export default {

    data() {
        return {
            user: '',
            pass: '',
            btnText: 'Entrar',
            btnActive: false
        }
    },

    methods: {

        sendFormLogin() {  

            this.$validator.validateAll().then(() => {
                
                let obj = {}
                obj.user = this.user
                obj.pass = this.pass
                
                this.btnText = 'Logando...'
                this.btnActive = true
                
                this.sentSuccess()

            }).catch(() => {});

            // auth.login(this, obj, 'secretquote')
        }, 
        
        sentSuccess() {

            this.btnActive = false
            this.btnText = 'Entrar'
            alert('enviado!')

        }

    }
}

</script>

