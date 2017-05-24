
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
            p.desc <strong>Contatos enviados para o doador:</strong> {{book.number_contacts}}

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
                        span.name Mensagem: *
                        textarea.field( v-validate="'required|max:225'" v-bind:class="{'-invalid': errors.has('message') }" name = 'message' )
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
            
            book.then( data => { 
                let objs = data.json();
                objs.then( (objs) => { 
                    this.book = objs.book;
                }).catch(() => { location.href = 'livros' });
            }).catch( () => { location.href = 'livros' });

            this.initReCaptcha();

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
                        sitekey: '6LfPqyIUAAAAAHSB_jfzZq_0fifUM_rbuvOTkS5Q',
                        badge: 'inline',
                        callback: self.setTokenReCaptcha
                    });
                }, 100);
                
            },

            setTokenReCaptcha(e) {
                this.tokenReCaptcha = true
            },


            sendMsgToDonor() {

                this.$validator.validateAll().then(() => {
                    
                    if( !this.tokenReCaptcha ) return alert('Por favor, clique no reCAPTCHA.')
                    else this.recaptchaError = false;

                    this.btnText = 'Editando...';
                    // this.btnActive = true;

                    let frm = document.querySelector("[data-form=msgBook]");
                    
                    var params = this.getParamsUrl();
                    let data = new FormData(frm);
                    data.append('book_id', params.id);
                    data.append('book_link', params.link);

                    var url = window.APIUrl + '/book/contact/';
                    var request = this.$http.post(url, data);
                    
                    request.then( (result) => {
                        let obj = result.json()
                        obj.then( (data) => {this.sentSuccess(data)});
                        obj.catch( (error) => {this.sentError(error)} );
                    }).catch((error) => {this.sentError(error)});

                }).catch(() => {});

            },


            sentSuccess(data) {
                console.log(data)
            },


            sentError(data) {
                console.log(data)
            }




        }

    }

</script>
