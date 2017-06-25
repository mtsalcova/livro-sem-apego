

<template lang="pug">
    
    main.books-container
        
        .icon-filter( @click = 'MobileFilterBooks' )

        aside.filter: form.form-styl.-sticky( data-form = 'filter' method = 'POST' @submit.prevent="sendFilters" )
    
            label.field-box
                span.name Título do Livro:
                input.field( type = 'text' name = 'title' )
            
            label.field-box
                span.name Autor:
                input.field( type = 'text' name = 'author' )

            label.field-box
                span.name Gênero:
                select.field( name = 'gender_id' )
                    option( value = '' )
                    option( v-for="gender of genders" v-bind:value="gender.id" ) {{ gender.name }}

            label.field-box
                span.name Editora:
                input.field( type = 'text' name = 'publisher' )

            label.field-box
                span.name Estado:
                select.field( name = 'state' )
                    each uf, value in { "": "", "AC": "AC", "AL": "AL", "AM": "AM", "AP": "AP","BA": "BA","CE": "CE","DF": "DF","ES": "ES","GO": "GO","MA": "MA","MT": "MT","MS": "MS","MG": "MG","PA": "PA","PB": "PB","PR": "PR","PE": "PE","PI": "PI","RJ": "RJ","RN": "RN","RO": "RO","RS": "RS","RR": "RR","SC": "SC","SE": "SE","SP": "SP","TO": "TO" }
                        option( value =value ) #{uf}

            button( class = 'btn-main -full' v-bind:class="{ '-sending': btnActive}" type="submit" ) {{btnFilter}}


        .list-books

            .title-list
                span Listando {{ booksTotal }} livro(s).

            .grid-books.-list( :class="gridbooks" )

                book-box( v-if = "books" v-for = "book in books"
                    :title = 'book.title',
                    :author = 'book.author',
                    :image = 'book.image',
                    :state = 'book.state',
                    :link = 'book.link'
                )

                p( v-if = "books == false"  ) Ops, não encontramos nenhum livro cadastrado para doação :(

            .pages-box( style = 'display: none' )
                a.btn-main.-disabled Anterior
                .pages
                    input( type = 'text' name = 'page' value = '1' )
                    span de 2
                a.btn-main Próximo

</template>


<script>

    import BookBox from './reusable/BookBox.vue'

    export default {

        components: {
            'book-box': BookBox
        },

        data() {
            return {
                booksTotal: 0,
                books: true,
                genders: [],
                btnFilter: 'Filtrar',
                btnActive: false,
                gridbooks: false,
                FilterTitle: ''
            }
        },

        created() {

            var search = location.search
            var filter = false
            if ( search && search.indexOf('?q=') > -1 ) {
                filter = search.replace('?q=', '');
            }   

            if( filter ) {
                var data = new FormData();
                data.append('title', filter);
                var request = this.$http.post( window.APIUrl + '/book/filter', data);

            } else var request = this.$http.get( window.APIUrl + '/book/load');

            request.then( (objs) => {
                objs.json().then( (json) => {
                    this.books = json.books
                    this.booksTotal = json.books.length
                });
            });


            // Load select Genders
            let genders = this.$http.get( window.APIUrl + '/book/selects/genders');
            genders.then( (rs) => {
                rs.json().then( (obj) => {
                    this.genders = obj.genders;
                }, error => {});
            });

        },


        methods: {

            sendFilters() {

                this.btnFilter = 'Filtrando...';
                this.btnActive = true;

                var frm = document.querySelector('[data-form=filter]');
                var data = new FormData(frm);

                let request = this.$http.post( window.APIUrl + '/book/filter', data);
                request.then( (rs) => {
                    rs.json().then((obj) => {
                        this.gridbooks = 'active'
                        let self = this
                        this.MobileFilterBooks()

                        setTimeout( () => {
                            self.books = obj.books;
                            self.booksTotal = obj.books.length
                            self.gridbooks = false;
                        }, 310);

                        this.resetBtnFilter();

                    }, () => { this.resetBtnFilter() });
                }, () => { this.resetBtnFilter() });

            },

            resetBtnFilter() {
                this.btnFilter = 'Filtrar'
                this.btnActive = false
            },

            MobileFilterBooks() {
                window.scrollTo(150,0);
                var booksContainer = document.querySelector('.books-container');
                booksContainer.classList.toggle( 'active' );
            }

        }

    }


</script>
