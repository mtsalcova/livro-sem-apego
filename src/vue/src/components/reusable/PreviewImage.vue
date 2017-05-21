
<template lang="pug">
    
    .field-box.-picture( :class = "{'-circle': circle}"  )
        span.name( v-html = "title" )
        .photo
            svg: use( :xlink:href = 'icon' )
            input( type = 'file' v-on:change="setFileReader" )
            img( v-bind:src="imageSrc || src" v-if="imageSrc || src" )

        p.error {{ error }}

</template>


<script>
    

    export default {

        props: ['icon', 'title', 'circle', 'src'],

        data() {
            return {
                imageSrc: false,
                error: ''
            }
        },

        methods: {

            setFileReader(e) {

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                var file = files[0];
                
                if(!/image\/jpeg|png/.test(file.type) || parseInt(file.size/1024/1024) > 5) {
                    e.target.value = '';
                    return this.error = 'Insira uma imagem válida'

                } else this.error = '';


                var reader = new FileReader();
                reader.onload = (e) => { 
                    this.imageSrc = e.target.result
                }
                reader.readAsDataURL(file); 

            }

        }


    }


</script>
