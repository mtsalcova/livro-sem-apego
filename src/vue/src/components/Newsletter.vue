

<template lang="pug">

    form.frm( method = 'POST' data-form="newsletter" @submit.prevent="sendEmail")
        .email-newsletter
            input.field( 
                v-validate="'required|email'"
                type = 'email' 
                name = 'email'
                placeholder = 'Digite seu e-mail' )
            button.btn-main.-inside( data-text = 'Cadastrar' v-bind:class="{ '-sending': btnActive }" )
        p( v-if = "result" v-bind:class = "resultEmail ? 'success' : 'error'" ) {{ resultText }}

</template>


<script>

    export default {

        data() {
            return {
                email: '',
                btnActive: false,
                resultText: '',
                result: false,
                resultEmail: false
            }
        },

        methods: {

            sendEmail(e) {

                this.$validator.validateAll().then(() => {

                    let frm = document.querySelector('[data-form=newsletter]');
                    let data = new FormData(frm);

                    let request = this.$http.post( window.APIUrl + '/newsletter/', data);
                    this.btnActive = true;
                    this.resultRequest(request, frm);

                });
                
            },

            resultRequest( data, frm ) {

                data.then( (success) => {
                    success.json()
                        .then( (obj) => {
                            if( obj.subscribed ) {
                                this.setSuccess();
                                frm.reset();
                                this.resetBtn();
                            } else this.setError();
                        }).catch(() => {this.setError()});
                });

                data.catch( () => { this.setError() } );

            },

            setSuccess() {
                this.resultText = 'Cadastrado com sucesso! :)';
                this.result = true;
                this.resultEmail = true;

            },

            setError() {
                this.resultText = 'Ocorreu um erro inesperado! :/';
                this.result = true;

            },

            resetBtn() {

                var self = this;
                setTimeout( () => {
                    self.btnActive = false;
                    self.resultText = '';
                    self.result = false;
                }, 2500);

            }

        }

    }

</script>



