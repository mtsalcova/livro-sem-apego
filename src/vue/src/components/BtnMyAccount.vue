
<template lang="pug">
    a( class = 'btn-main' v-bind:href = 'valueHref' ) Minha conta
</template>

<script>

    import auth from '../auth'

    export default {
        
        created() {
            auth.checkAuth()
            if( auth.user.authenticated ) this.valueHref = './painel'
            else this.valueHref = './login'
        }

        
    }

</script>
