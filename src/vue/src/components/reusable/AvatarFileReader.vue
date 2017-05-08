

<template lang="jade">
    
    .field-box.-picture.-circle
        span.name Foto de Perfil: <strong>(Tamanho Máx. 2MB e Extensão .png ou .jpg)</strong>
        .photo
            svg: use( xlink:href = 'img/svg.svg#icon-profile-photo' )
            input( type = 'file' name = 'avatar' v-on:change="setFileReader" )
            img( v-bind:src="imageSrc" v-if="avatarSrc" )
        
        p.error( v-if="error" ) Insira uma imagem válida.
        

</template>


<script>

    export default {

        props: ['avatarSrc'],

        data() {
            return {
                error: false,
                imageSrc: this.avatarSrc
            }
        },

        methods: {

            setFileReader(e) {

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;

                var file = files[0];

                if(!/image\/jpeg|png/.test(file.type) || parseInt(file.size/1024/1024) > 2) {
                    e.target.value = '';
                    return this.error = true;

                } else this.error = false;
                
                var reader = new FileReader();
                reader.onload = (e) => {
                    // this.imageSrc = e.target .result;
                    // this.$emit('file-reader', e.target.result);
                };
                reader.readAsDataURL(file);

            }

        }

    }

</script>
