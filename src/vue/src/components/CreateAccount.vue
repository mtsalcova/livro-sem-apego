
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

        .field-box.-picture.-circle
            span.name Foto de Perfil: <strong>(Tamanho Máx. 2MB e Extensão .png ou .jpg)</strong>
            .photo
                svg: use( xlink:href = 'img/svg.svg#icon-profile-photo' )
                input( type = 'file' name = 'avatar' v-on:change="setFileReader" )
                img( v-bind:src="avatarSrc" v-if="avatarSrc" )
            
            p.error( v-if="onlyImage" ) Insira uma imagem válida.

        button( class="btn-main -full" v-bind:class="{ sending: btnActive }" type="submit" ) {{ btnText }}

</template>


<script>

export default {

    data() {
        return {
            btnText: 'Criar Conta',
            btnActive: false,
            avatarSrc: false,
            onlyImage: false,
            existEmail: false
        }
    },

    methods: {

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
                this.avatarSrc = e.target.result;
            };
            reader.readAsDataURL(file);

        },

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

