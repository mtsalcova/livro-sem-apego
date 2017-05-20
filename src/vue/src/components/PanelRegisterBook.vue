
<template lang="pug"> 

    main.content

        .header-panel
            a.btn-main( href = 'user-books.html' ) < Voltar
            h1.title Doar um Livro
            p.desc Cadastre o livro que deseja doar abaixo e obrigado por essa ação! :)
        
        form.form-styl( method = 'post' data-form="registerBook" enctype="multipart/form-data" @submit.prevent="registerBook" )

            label.field-box
                span.name Título do Livro: *
                input( v-validate="'required'" v-bind:class="{'-invalid': errors.has('title') }" type="text" name = 'title' class="field" )
                p.error( v-if="errors.has('title')" ) Este campo é obrigatório.

            label.field-box
                span.name Autor: *
                input( v-validate="'required'" v-bind:class="{'-invalid': errors.has('author') }" type="text" name = 'author' class="field" )
                p.error( v-if="errors.has('author')" ) Este campo é obrigatório.
            
            label.field-box
                span.name Descrição: * <i>Máximo de 255 caracteres</i>
                textarea( v-validate="'required'" v-bind:class="{'-invalid': errors.has('description') }" type="text" name = 'description' class="field" )
                p.error( v-if="errors.has('description')" ) Este campo é obrigatório.

            label.field-box.-small
                span.name Gênero: *
                select.field( name = 'gender_id' v-validate="'required'" v-bind:class="{'-invalid': errors.has('gender') }" )
                    option( v-for="gender of genders" v-bind:value="gender.id" ) {{ gender.name }}
                p.error( v-if="errors.has('gender')" ) Preencha o Gênero.

            label.field-box.-small
                span.name Editora: *
                input( type="text" name = 'publisher' v-validate="'required'" v-bind:class="{'-invalid': errors.has('publisher') }" class="field" )
                p.error( v-if="errors.has('publisher')" ) Preencha a Editora.

            label.field-box.-small
                span.name Idioma: *
                select.field( name = 'language_id' v-validate="'required'" v-bind:class="{'-invalid': errors.has('languages') }" )
                    option( v-for="lang of languages" v-bind:value="lang.id" ) {{ lang.name }}
                p.error( v-if="errors.has('languages')" ) Preencha o Idioma.

            label.field-box.-small
                span.name Estado do Livro: *
                select.field( name = 'book_status_id' v-validate="'required'" v-bind:class="{'-invalid': errors.has('status') }" )
                    option( v-for="stt of status" v-bind:value="stt.id" ) {{ stt.name }}
                p.error( v-if="errors.has('status')" ) Preencha o Estado do Livro.

            label.field-box.-small
                span.name Ano: *
                input.field( v-validate="'required'" v-bind:class="{'-invalid': errors.has('release_year') }" type = 'number' name = 'release_year' )
                p.error( v-if="errors.has('release_year')" ) Preencha o ano.

            label.field-box.-small
                span.name Quantidade: *
                input.field( v-validate="'required'" v-bind:class="{'-invalid': errors.has('quantity') }" type = 'number' name = 'quantity' )
                p.error( v-if="errors.has('quantity')" ) Preencha a quantidde.


            preview-image( v-for = "preview in previewImage"
                :icon = "preview.icon",
                :title = "preview.title",
                :circle = "preview.circle"
            )

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
                btnText: 'Cadastrar Livro',
                btnActive: false,
                genders: [],
                languages: [],
                status: [],
                previewImage: [{
                    icon: "img/svg.svg#icon-no-img",
                    title: "Foto Principal: <strong>(Tamanho Máx. 5MB e Extensão .png ou .jpg)</strong>",
                    circle: false
                }]
            }
        },


        created() {
            var optionsSlct = this.$http.get(window.APIUrl + '/book/selects', {headers: auth.getAuthHeader()})
            optionsSlct.then( data => {
                data.json().then( (objs) => {
                    this.genders = objs.genders;
                    this.languages = objs.languages;                                    
                    this.status = objs.book_status;      

                }, error => {})
            }, error => { if( error.status === 401 ) auth.logout()});

        },

        methods: {


            registerBook() {

                this.$validator.validateAll().then(() => {
                    
                    this.btnText = 'Cadastrando...';
                    this.btnActive = true;
                    this.send();
                    
                }).catch(() => {});


            },

            send() {

                var frm = document.querySelector("[data-form=registerBook]");
                var data = new FormData(frm);
                
                var file = document.querySelector('.photo [type=file]').files[0]
                if ( file ) data.append( 'image', file);

                var url = window.APIUrl + '/book/register';
                var request = this.$http.post(url, data, {headers: auth.getAuthHeader()});
                
                request.then(result => {
                    result.json().then( data => {
                        if( data.success ) this.sentSuccess( data.success )
                        else this.sentError()
                    }, () => { this.sentError() });
                }, () => { this.sentError() });

            },

            sentSuccess(text) {

                var frm = document.querySelector("[data-form=registerBook]");
                frm.reset();
                this.btnText = text;

                setTimeout(() => {
                    location.href = 'painel/livros'
                }, 3000);
                
            },

            sentError() {
                this.btnText = 'Ocorreu um erro inesperado.';
                this.resetModification();
            },

            resetModification() {
                setTimeout(() => {
                    this.btnText = 'Cadastrar Livros';
                    this.btnActive = false;
                }, 3000);
            }


        }


    }
    
</script>
