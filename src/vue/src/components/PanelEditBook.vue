
<template lang="pug"> 

    main.content

        .header-panel
            a.btn-main( href = 'painel/livros' ) < Voltar
            h1.title Editar Livro
        
        form.form-styl( method = 'post' data-form="editBook" enctype="multipart/form-data" @submit.prevent="editBook" )

            label.field-box
                span.name Título do Livro: *
                input( v-model = "book.title" v-validate="'required'" v-bind:class="{'-invalid': errors.has('title') }" type="text" name = 'title' class="field" )
                p.error( v-if="errors.has('title')" ) Este campo é obrigatório.

            label.field-box
                span.name Autor: *
                input( v-model = "book.author" v-validate="'required'" v-bind:class="{'-invalid': errors.has('author') }" type="text" name = 'author' class="field" )
                p.error( v-if="errors.has('author')" ) Este campo é obrigatório.
            
            label.field-box
                span.name Descrição: * <i>Máximo de 255 caracteres</i>
                textarea( v-model = "book.description" v-validate="'required'" v-bind:class="{'-invalid': errors.has('description') }" type="text" name = 'description' class="field" )
                p.error( v-if="errors.has('description')" ) Este campo é obrigatório.

            label.field-box.-small
                span.name Gênero: *
                select.field( v-model = "book.gender_id" name = 'gender_id' v-validate="'required'" v-bind:class="{'-invalid': errors.has('gender') }" )
                    option( v-for="gender of genders" 
                        :selected = "gender.id == book.gender_id ? 'selected' : ''"
                        :value="gender.id" ) {{ gender.name }}
                p.error( v-if="errors.has('gender')" ) Preencha o Gênero.

            label.field-box.-small
                span.name Editora: *
                input( v-model = "book.author" type="text" name = 'publisher' v-validate="'required'" v-bind:class="{'-invalid': errors.has('publisher') }" class="field" )
                p.error( v-if="errors.has('publisher')" ) Preencha a Editora.

            label.field-box.-small
                span.name Idioma: *
                select.field( v-model = "book.language_id" name = 'language_id' v-validate="'required'" v-bind:class="{'-invalid': errors.has('languages') }" )
                    option( v-for="lang of languages" 
                        :selected = "lang.id == book.language_id ? 'selected' : ''"
                        :value = "lang.id" ) {{ lang.name }}

                p.error( v-if="errors.has('languages')" ) Preencha o Idioma.

            label.field-box.-small
                span.name Estado do Livro: *
                select.field( v-model = "book.book_status_id" name = 'book_status_id' v-validate="'required'" v-bind:class="{'-invalid': errors.has('status') }" )
                    option( v-for="stt of status" 
                        :selected = "stt.id == book.book_status_id ? 'selected' : ''"
                        :value="stt.id" ) {{ stt.name }}
                p.error( v-if="errors.has('status')" ) Preencha o Estado do Livro.

            label.field-box.-small
                span.name Ano: *
                input.field( v-model = "book.release_year" v-validate="'required'" v-bind:class="{'-invalid': errors.has('release_year') }" type = 'number' name = 'release_year' )
                p.error( v-if="errors.has('release_year')" ) Preencha o ano.

            label.field-box.-small
                span.name Quantidade: *
                input.field( v-model = "book.quantity" v-validate="'required'" v-bind:class="{'-invalid': errors.has('quantity') }" type = 'number' name = 'quantity' )
                p.error( v-if="errors.has('quantity')" ) Preencha a quantidde.


            preview-image( v-for = "preview in previewImage"
                :icon = "preview.icon",
                :title = "preview.title",
                :circle = "preview.circle",
                :src = "book.image"
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
                btnText: 'Editar Livro',
                btnActive: false,
                genders: [],
                languages: [],
                status: [],
                previewImage: [{
                    icon: "img/svg.svg#icon-no-img",
                    title: "Foto Principal: <strong>(Tamanho Máx. 5MB e Extensão .png ou .jpg)</strong>",
                    circle: false
                }],
                book: {}
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

            var book_id = this.getIDBook();
            var book = this.$http.get(window.APIUrl + '/book/edit/' + book_id, {headers: auth.getAuthHeader()});

            book.then( (data) => {
                data.json().then( (res) => {this.book = res.books})
            }).catch( () => {} );


        },

        methods: {


            editBook() {

                this.$validator.validateAll().then(() => {
                    
                    this.btnText = 'Editando...';
                    this.btnActive = true;
                    this.send();
                    
                }).catch(() => {});


            },

            send() {

                var frm = document.querySelector("[data-form=editBook]");
                var data = new FormData(frm);
                
                var file = document.querySelector('.photo [type=file]').files[0]
                if ( file ) data.append( 'image', file);

                var book_id = this.getIDBook();
                var url = window.APIUrl + '/book/edit/' + book_id;
                var request = this.$http.post(url, data, {headers: auth.getAuthHeader()});
                
                request.then( (result) => {
                    result.json().then( data => {
                        if( data.success ) this.sentSuccess();
                        else this.sentError()
                    }, () => { this.sentError() });
                    
                }).catch( (error) => { if( error.status === 401 ) auth.logout() });;

            },

            sentSuccess() {
                this.btnText = 'Livro alterado com sucesso!';
                this.resetModification();

            },

            sentError(text) {
                this.btnText = 'Ops, ocorreu um erro ao editar.';
                this.resetModification();
            },

            resetModification() {
                setTimeout(() => {
                    this.btnText = 'Editar Livros';
                    this.btnActive = false;
                }, 3000);
            },

            getIDBook() {

                var url = location.pathname;
                var params = url.split('/');
                var total = params.length - 1;
                var id = false;

                if( !params[total] ) id = parseInt(params[total-1]);
                else id = parseInt(params[total]);

                return id;

            }


        }


    }
    
</script>
