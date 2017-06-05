<template lang="pug">

    form( method="post" data-form="login" class="form-styl" @submit.prevent="sendFormLogin" )
        
        label.field-box
            span.name E-mail: *
            input( v-validate="'required|email'" v-model = "email" v-bind:class="{'-invalid': errors.has('email') }" name = "email" type="email" class="field" )
            p.error( v-if="errors.has('email')" ) Digite um e-mail válido.
        
        label.field-box
            span.name Senha: * <i>(Mínimo 6 caracteres)</i>
            input( v-validate="'required|min:6'" v-bind:class="{'-invalid': errors.has('password') }" type="password" name = 'password' v-model="password" class="field" )
            p.error( v-if="errors.has('password')" ) Digite uma senha válida.

        button( class="btn-main -full" v-bind:class="{ '-sending': btnActive}" type="submit" ) {{ btnText }}
        
        a( href="redefinir-senha" class="forgetpass" ) Esqueceu sua senha?

</template>

<script>

import auth from '../auth'
    
export default {

    beforeCreate() {
        auth.checkAuth();
        if( auth.user.authenticated ) location.href = './painel'
    },
    
    data() {
        return {
            email: '',
            password: '',
            btnText: 'Entrar',
            btnActive: false
        }
    },

    methods: {

        sendFormLogin() {  

            this.$validator.validateAll().then(() => {
                
                let frm = document.querySelector("[data-form=login]");
                let data = new FormData(frm);

                this.btnText = 'Logando...'
                this.btnActive = true

                auth.login(this, data)

            }).catch(() => {});

        }, 
        
        setError() {
            
            this.btnText = 'Dados inválidos!'

            setTimeout(() => {
                this.btnText = 'Entrar'
                this.btnActive = false
            }, 2000)

        }

    }
}

</script>

