
<template lang="pug">

    form.form-styl( method = 'post' data-form="createAccount" enctype="multipart/form-data" @submit.prevent="validateForm" )

        label.field-box
            span.name Nome: *
            input( v-validate="'required'" v-bind:class="{'-invalid': errors.has('name') }" type="text" name = 'name' v-model="name" class="field" )
            p.error( v-if="errors.has('name')" ) Digite um nome válido

        label.field-box
            span.name E-mail: *
            input( v-validate="'required|email'" @blur="verifyExistEmail" v-model = "email" v-bind:class="{'-invalid': errors.has('email'), '-existemail': existEmail  }" name = "email" type="email" class="field" )
            p.error( v-if="errors.has('email')" ) Digite um e-mail válido.
            p.error( v-if="existEmail" ) Esse e-mail já está cadastrado.

        label.field-box
            span.name Senha: * <i>(Mínimo 6 caracteres)</i>
            input( v-validate="'required|min:6'" v-bind:class="{'-invalid': errors.has('password')}" type="password" name = 'password' v-model="password" class="field" )
            p.error( v-if="errors.has('password')" ) Digite uma senha válida.

        label.field-box.-cep
            span.name CEP: * <i>(Apenas números)</i>
            input.field( v-validate="'required'" v-bind:class="{'-invalid': errors.has('cep')}" type = 'text'  name = 'cep' v-model = "cep" )
            a( href = 'http://www.buscacep.correios.com.br/' target = '_blank' ) Não sei meu cep
            p.error( v-if="errors.has('cep')" ) Digite um CEP válido.

        preview-image( 
            :icon = "previewImage.icon",
            :title = "previewImage.title",
            :circle = "previewImage.circle",
            :src = "previewImage.src"
        )

        button( class="btn-main -full" v-bind:class="{ '-sending': btnActive }" type="submit" ) {{ btnText }}

</template>


<script>

    import auth from '../auth'
    import PreviewImage from './reusable/PreviewImage.vue'

    export default {

        components: {
            'preview-image': PreviewImage
        },

        data() {
            return {
                btnText: 'Criar Conta',
                btnActive: false,
                existEmail: false,
                previewImage: {
                    icon: "img/svg.svg#icon-profile-photo",
                    title: "Foto de Perfil: <strong>(Tamanho Máx. 5MB e Extensão .png ou .jpg)</strong>",
                    circle: true,
                    src: false
                }

            }
        },

        methods: {

            validateForm() {  

                if( this.existEmail ) return false;

                this.$validator.validateAll().then(() => {
                    
                    this.btnText = 'Criando...';
                    this.btnActive = true;

                    let frm = document.querySelector("[data-form=createAccount]");
                    let data = new FormData(frm);

                    var file = document.querySelector('.photo [type=file]').files[0]
                    if ( file ) data.append('image', file);
                    
                    auth.signup(this, data);


                }).catch(() => {});
                

            },

            setError() {
                this.btnText = 'Ocorreu um erro inesperado :('

                setTimeout(() => {
                    this.btnActive = false
                    this.btnText = 'Criar Conta'
                }, 2000)
            },

            verifyExistEmail() {

                if( !this.email ) return this.existEmail = false

                var obj = new FormData();
                obj.append( 'email', this.email );

                this.$http.post( window.APIUrl + '/user/email', obj ).then( rs => {

                    rs.json().then( rs => {
                        if (rs.existEmail) this.existEmail = true;
                        else this.existEmail = false;
                    }, error => {this.existEmail = false});

                }, error => {});

            }

        }
    
    }

</script>

