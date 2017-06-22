
<template lang="pug">

    main.content

        .header-panel
            h1.title Editar Cadastro

        form.form-styl( method = 'post' data-form="profileUser" enctype="multipart/form-data" @submit.prevent="editDataUser" )

            label.field-box
                span.name Nome: *
                input( v-validate="'required'" v-bind:class="{'-invalid': errors.has('name') }" type="text" name = 'name' v-model="name" class="field" )
                p.error( v-if="errors.has('name')" ) Digite um nome válido
                
            label.field-box
                span.name E-mail: *
                input( v-validate="'required|email'" @blur="verifyExistEmail" v-model = "email" v-bind:class="{'-invalid': errors.has('email'), '-existemail': existEmail }" name = "email" type="email" class="field" )
                p.error( v-if="errors.has('email')" ) Digite um e-mail válido.
                p.error( v-if="existEmail" ) Esse e-mail já está cadastrado.

            label.field-box.-cep
                span.name CEP: * <i>(Apenas números)</i>
                input.field( v-validate="'required'" maxlength="8" v-bind:class="{'-invalid': errors.has('cep')}" type = 'text'  name = 'cep' v-model = "cep" )
                a( href = 'http://www.buscacep.correios.com.br/' target = '_blank' ) Não sei meu cep
                p.error( v-if="errors.has('cep')" ) Digite um CEP válido.

            preview-image( 
                :icon = "previewImage.icon",
                :title = "previewImage.title",
                :circle = "previewImage.circle",
                :src = "previewImage.src"
            )
                
            label.field-box
                span.name Nova Senha: <i>(Mínimo 6 caracteres)</i>
                input( v-validate="'min:6'" v-bind:class="{'-invalid': errors.has('password') }" type="password" name = 'password' v-model="password" class="field -pass" )
                p.error( v-if="errors.has('password')" ) Digite uma senha válida.

            label.field-box
                span.name Confirme a Senha:
                input( v-validate="'min:6|confirmed:password'" v-bind:class="{'-invalid': errors.has('c_password') }" type="password" name = 'c_password' v-model="c_password" class="field -pass" )
                p.error( v-if="errors.has('c_password')" ) As senhas não conferem.

            button( class="btn-main" v-bind:class="{ '-sending': btnActive }" type="submit" ) {{ btnText }}

</template>


<script>

    import auth from '../auth'
    import PreviewImage from './reusable/PreviewImage.vue'
    
    export default {

        components: {
            'preview-image': PreviewImage
        },

        beforeCreate() {
            auth.checkAuth();
            if( !auth.user.authenticated ) location.href = './login'
        },

        data() {

            return {
                btnText: 'Editar Cadastro',
                btnActive: false,
                existEmail: false,
                name: null,
                email: null,
                cep: null,
                previewImage: {
                    icon: "img/svg.svg#icon-profile-photo",
                    title: "Foto de Perfil: <strong>(Tamanho Máx. 5MB e Extensão .png ou .jpg)</strong>",
                    circle: true,
                    src: false
                }
                
            }
        },

        created() {

            let user_id = localStorage.getItem('id_token');
            this.$http.get( window.APIUrl + '/user/' + user_id, 
                {
                    headers: auth.getAuthHeader()
                
                }).then( success => {
                    this.loadDataForm(success);

                }, error => { 
                    if( error.status === 401 ) auth.logout();
                }
            );

        },

        methods: {
            
            loadDataForm(data) {
                
                var objs = data.json()
                
                objs.then(obj => {

                    if( obj.user.image ) {
                        this.previewImage.src = 'img/avatar/' + obj.user.image;
                    }

                    this.name = obj.user.name;
                    this.email = obj.user.email;
                    this.cep = obj.user.cep;

                }, error => {});
            
            },
            
            validateForm() {  

                this.$validator.validateAll().then(() => {
                    
                    this.btnText = 'Criando...'
                    this.btnActive = true
                    
                    this.send()

                }).catch(() => {});

            }, 
            
            editDataUser() {    

                if( (this.password && !this.c_password) || (!this.password && this.c_password) ) {
                    return alert('Confirme a nova senha por favor!');
                }

                this.$validator.validateAll().then(() => {
                    
                    this.btnText = 'Editando...';
                    this.btnActive = true;
                    this.send();
                    
                }).catch(() => {});

            },

            send() {
                
                let frm = document.querySelector("[data-form=profileUser]");
                let data = new FormData(frm);

                var file = document.querySelector('.photo [type=file]').files[0]
                if ( file ) data.append( 'image', file);

                var user_id = localStorage.getItem('id_token');
                var url = window.APIUrl + '/user/edit/' + user_id;
                
                var request = this.$http.post(url, data, {headers: auth.getAuthHeader()});
                
                request.then(result => {
                    result.json().then( data => {
                        if( data.success ) this.sentSuccess()
                        else this.sentError()
                    }, () => { this.sentError() });

                }).catch( (error) => { if( error.status === 401 ) auth.logout() });

            },

            sentSuccess() {
                this.btnText = 'Cadastro editado com sucesso!';
                this.password = null;
                this.c_password = null;
                this.resetModification();
            },

            sentError() {
                this.btnText = 'Ocorreu um erro inesperado.';
                this.resetModification();
            },

            resetModification() {
                setTimeout(() => {
                    this.btnText = 'Editar Cadastro';
                    this.btnActive = false;
                }, 3000);
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

                }).catch( (error) => { if( error.status === 401 ) auth.logout() });

            }

        }
    }

</script>

