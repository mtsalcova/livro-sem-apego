

<template lang="pug">

    .book-box
        a.link( :href = 'link' )
        i.location {{ state }}
        .image
            img( :src = 'image' )
            .subtitle: strong Adquirir >
        h2.name {{ title }}
        h3.author {{ author }}

</template>


<script>

    export default {

        props: ['state', 'link', 'image', 'title', 'author']

    }

</script>
