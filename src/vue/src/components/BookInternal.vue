
<template lang="pug">

    div
    
        section.title-main.-alone
            h1.title {{ book.title }}
            h2.subtitle.-line {{ book.author }}

        .about-book

            .gallery-book

                .large
                    img( :src = 'book.image' v-if = "book.image" )
                    svg: use( xlink:href = 'img/svg.svg#icon-no-img' )
            
            .infos-book
                h2.subtitle Descrição
                p.desc {{ book.description }}
                
                ul
                    li <strong>Genêro:</strong> {{ book.gender }}
                    li <strong>Editora:</strong> {{ book.publisher }}
                    li <strong>Idioma:</strong> {{ book.language }}
                    li <strong>Estado do Livro:</strong> {{ book.book_status }}
                    li <strong>Ano:</strong> {{ book.release_year }}
                    li <strong>Quantidade:</strong> {{ book.quantity }}

                a.btn-main( :href = "btnAnchorForm") Adquirir Livro
        

        .send-msg( id = 'getbook' )
            h2.subtitle Gostaria de ganhar esse livro?
            p.desc Então entre em contato com o doador abaixo, quem sabe dê tempo! ;)
            p.desc Total de pessoas que entraram em contato com o doador: <strong>{{book.number_contacts}}</strong>

            .giver-box

                form.form-styl( method = 'POST' data-form="msgBook" @submit.prevent="sendMsgToDonor" )

                    label.field-box
                        span.name Nome: *
                        input.field( v-validate="'required'" v-bind:class="{'-invalid': errors.has('name') }" type = 'text' name = 'name' )
                        p.error( v-if="errors.has('name')" ) Este campo é obrigatório.

                    label.field-box
                        span.name E-mail: *
                        input.field( v-validate="'required|email'" v-bind:class="{'-invalid': errors.has('email') }" type = 'email' name = 'email' )
                        p.error( v-if="errors.has('email')" ) Este campo é obrigatório.

                    label.field-box
                        span.name Celular: 
                        input.field( type = 'text' name = 'phone' maxlength="16" )

                    label.field-box
                        span.name Mensagem: (<i>Máximo de 500 caracteres</i>) *
                        textarea.field( v-validate="'required|max:500'" v-bind:class="{'-invalid': errors.has('message') }" name = 'message' )
                        p.error( v-if="errors.has('message')" ) Este campo é obrigatório.

                    div( class="g-recaptcha" id = 'recaptcha' )
                    button( class="btn-main" v-bind:class="{ '-sending': btnActive }" type="submit" ) {{ btnText }}

                
                .giver-data
                    
                    .perfil
                        .photo
                            img( :src = 'book.user_image' v-if="book.user_image"  )
                            svg: use( xlink:href="img/svg.svg#icon-profile-photo" )

                        h3.name {{ book.user_name }}
                        p.city {{ book.user_city }}-{{ book.user_state }}


                    .data
                        ul
                            //- li <strong>Livros Doados:</strong> 10
                            li <strong>Livros Cadastrados:</strong> {{ book.user_donated_books }}
                            li <strong>Usuário desde:</strong> {{ book.user_registered }}
                        
                        //- .social-networks
                        //-     a.fb(href = '' title = 'Facebook'  target = '_blank' )
                        //-     a.in(href = '' title = 'Instagram'  target = '_blank' )
                        //-     a.tw(href = '' title = 'Twitter'  target = '_blank' )


</template>

<script>
    
    export default {

        data() {
            return {
                btnAnchorForm: location.pathname + '#getbook',
                book: {},
                tokenReCaptcha: false,
                btnText: 'Enviar',
                btnActive: false,
            }

        },


        created() {

            var params = this.getParamsUrl();
            var url = window.APIUrl + '/book/internal/' + params.link + '/'+ params.id;
            let book = this.$http.get( url );
            var self = this;
            
            book.then( data => { 
                let objs = data.json();
                objs.then( (objs) => { 
                    this.book = objs.book;
                    self.$emit('updateHead');

                }).catch(() => { location.href = '/livros' });
            }).catch( () => { location.href = '/livros' });

            this.initReCaptcha();

        },

        head: {
            title() {
                return {
                    inner: this.book.title + ' de ' + this.book.author
                }
            },
            meta() {
                return [
                    { p: 'og:title', c: 'Livro para Doação: ' + this.book.title + ' - ' + this.book.author },
                    { p: 'og:description', c: this.book.description },
                    { p: 'og:url', c: window.location.href },
                    { p: 'og:image', c: window.location.origin + '/' + this.book.image },
                    { name: 'description', content: this.book.description }
                ]
            }
        },

        methods: {

            getParamsUrl() {

                var url = location.pathname;
                var params = url.split('/');
                var total = params.length - 1;
                var id = false;
                var index = 0;
                var link = false;

                if( !params[total] ) index = total - 1;
                else index = total;
                
                id = parseInt(params[index]);
                link = params[index-1];
                
                return {
                    id: id,
                    link: link
                }

            },

            initReCaptcha() {
                var self = this;
                setTimeout( () => {
                    if( typeof grecaptcha === 'undefined' ) return self.initReCaptcha();
                    grecaptcha.render('recaptcha', {
                        sitekey: '6Le1uyIUAAAAAEHKPHJtkx2HW6hJusMHIUq5ICF6',
                        badge: 'inline',
                        callback: self.setTokenReCaptcha
                    });
                }, 100);
                
            },

            setTokenReCaptcha(e) {
                this.tokenReCaptcha = e
            },


            sendMsgToDonor() {

                this.$validator.validateAll().then(() => {
                    
                    if( !this.tokenReCaptcha ) return alert('Por favor, clique no reCAPTCHA.')
                    else this.recaptchaError = false;

                    this.btnText = 'Enviando...';
                    this.btnActive = true;

                    let frm = document.querySelector("[data-form=msgBook]");
                    
                    var params = this.getParamsUrl();
                    let data = new FormData(frm);
                    data.append('book_id', params.id);
                    data.append('book_link', params.link);

                    var url = window.APIUrl + '/book/contact/';
                    var request = this.$http.post(url, data);
                    
                    request.then( (result) => {
                        let obj = result.json()
                        obj.then( (data) => {
                            if( data.success ) {
                                this.sentSuccess(data.success);
                                frm.reset();
                            } else this.sentError( data.error );
                        });

                        obj.catch( () => {this.sentError()} );
                    }).catch(() => {this.sentError()});

                }).catch(() => {});

            },


            sentSuccess(data) {
                this.btnText = data
                grecaptcha.reset();
                this.btnReset();
            },


            sentError(error = false) {
                var txt = false;
                if( error ) txt = error
                else txt = 'Ocorreu um erro inesperado'

                this.btnText = txt
                this.btnReset();

            },

            btnReset() {

                setTimeout( () => {
                    this.btnText = 'Enviar'
                    this.btnActive = false;
                }, 2000)

            }





        }

    }

</script>
