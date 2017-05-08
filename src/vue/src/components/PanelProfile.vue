
<template lang="jade">

    form.form-styl( method = 'post' data-form="createAccount" enctype="multipart/form-data" @submit.prevent="validateForm" )

        label.field-box
            span.name Nome: *
            input( v-validate="'required'" v-bind:class="{'-invalid': errors.has('name') }" type="text" name = 'name' v-model="name" class="field" )
            p.error( v-if="errors.has('name')" ) Digite um nome válido

        label.field-box
            span.name E-mail: *
            input( v-validate="'required|email'" v-model = "user" v-bind:class="{'-invalid': errors.has('email') }" name = "email" type="email" class="field" )
            p.error( v-if="errors.has('email')" ) Digite um e-mail válido.

        label.field-box
            span.name Senha: * <i>(Mínimo 6 caracteres)</i>
            input( v-validate="'required|min:6'" v-bind:class="{'-invalid': errors.has('pass') }" type="password" name = 'pass' v-model="pass" class="field" )
            p.error( v-if="errors.has('pass')" ) Digite uma senha válida.

        label.field-box.-cep
            span.name CEP: <i>(Apenas números)</i>
            input.field( type = 'text' name = 'cep' v-model = "cep" )
            a( href = 'http://www.buscacep.correios.com.br/' target = '_blank' ) Não sei meu cep

        avatar-file-reader( v-bind:avatarSrc="avatarSrc")

        label.field-box
            span.name Nova Senha: <i>(Mínimo 6 caracteres)</i>
            input( v-validate="'min:6'" v-bind:class="{'-invalid': errors.has('pass') }" type="password" name = 'pass' v-model="pass" class="field" )
            p.error( v-if="errors.has('pass')" ) Digite uma senha válida.

        label.field-box
            span.name Confirme a nova senha:
            input.field.-pass( type = 'password' name = 'cpass' )

        button( class="btn-main" v-bind:class="{ 'sending': btnActive }" type="submit" ) {{ btnText }}

</template>


<script>

    import AvatarFileReader from './reusable/AvatarFileReader.vue'

    export default {

        components: {
            'avatar-file-reader': AvatarFileReader
        },

        data() {

            return {
                btnText: 'Editar Cadastro',
                btnActive: false,
                onlyImage: false,
                existEmail: false,
                avatarSrc: ''
            }
        },

        methods: {
           
            validateForm() {  

                this.$validator.validateAll().then(() => {
                    
                    this.btnText = 'Criando...'
                    this.btnActive = true
                    
                    this.send()

                }).catch(() => {});

            }, 
            
            send() {

                let frm = document.querySelector("[data-form=createAccount]");
                let data = new FormData(frm);

                this.$http.post('http://localhost/test/index.php', data).then(rs => {
                    console.log(rs.data)
                }, rs => {
                    console.log('error')
                });

                this.btnActive = false
                this.btnText = 'Entrar'
                // alert('enviado!')

            }

        }
    }

</script>

