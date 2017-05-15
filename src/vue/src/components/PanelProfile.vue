
<template lang="jade">

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
                span.name CEP: <i>(Apenas números)</i>
                input.field( type = 'text' name = 'cep' v-model = "cep" )
                a( href = 'http://www.buscacep.correios.com.br/' target = '_blank' ) Não sei meu cep

            .field-box.-picture.-circle
                span.name Foto de Perfil: <strong>(Tamanho Máx. 2MB e Extensão .png ou .jpg)</strong>
                .photo
                    svg: use( xlink:href = 'img/svg.svg#icon-profile-photo' )
                    input( type = 'file' v-on:change="setFileReader" )
                    img( v-bind:src="avatarSrc" v-if="avatarSrc" )
                    input( type = "hidden" name = "avatar" v-bind:value="avatarFileReader" v-if="avatarFileReader" )
                
                p.error( v-if="onlyImage" ) Insira uma imagem válida.
                
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
    export default {

        beforeCreate() {
            auth.checkAuth();
            if( !auth.user.authenticated ) location.href = './login'
        },

        data() {

            return {
                btnText: 'Editar Cadastro',
                btnActive: false,
                onlyImage: false,
                existEmail: false,
                name: null,
                email: null,
                avatarSrc: null,
                avatarFileReader: null,
                cep: null,
                
            }
        },

        created() {

            let user_id = localStorage.getItem('id_token');
            this.$http.get('http://localhost/api/user/'+user_id, 
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
                    if( obj.user.avatar ) {
                        this.avatarSrc = '/livro-sem-apego/public/img/avatar/' + obj.user.avatar;
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

                var user_id = localStorage.getItem('id_token');
                var url = 'http://localhost/api/user/edit/'+user_id;
                
                var request = this.$http.post(url, data, {headers: auth.getAuthHeader()});
                
                request.then(result => {
                    result.json().then( data => {
                        if( data.success ) this.sentSuccess()
                        else this.sentError()
                    }, () => { this.sentError() });
                }, () => { this.sentError() });

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

            setFileReader(e) {

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;

                var file = files[0];

                if(!/image\/jpeg|png/.test(file.type) || parseInt(file.size/1024/1024) > 2) {
                    e.target.value = '';
                    return this.onlyImage = true;

                } else this.onlyImage = false;
                
                var reader = new FileReader();
                reader.onload = (e) => { 
                    this.avatarSrc = e.target.result
                    this.avatarFileReader = e.target.result
                 };
                reader.readAsDataURL(file);

            },

            verifyExistEmail() {

                if( !this.email ) return this.existEmail = false

                var obj = new FormData();
                obj.append( 'email', this.email );

                this.$http.post( 'http://localhost/api/user/email', obj ).then( rs => {

                    rs.json().then( rs => {
                        if (rs.existEmail) this.existEmail = true;
                        else this.existEmail = false;
                    }, error => {this.existEmail = false});

                }, error => {});

            }

        }
    }

</script>

