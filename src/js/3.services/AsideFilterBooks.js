;(function( win, doc ) {
    'use strict';



    function AsideFilterBooks() {


        var $public  = {};
        var $private = {};


        $public.init = function init() {
            return $private.setEvent();
        }


        $private.setEvent = function setEvent() {

            var filter = doc.querySelector('.icon-filter');
            if(!filter) return false;

            filter.addEventListener('click', function() {
                window.scrollTo(0,0);
                var booksContainer = doc.querySelector('.books-container');
                booksContainer.classList.toggle( 'active' );
            }, false);

        }


        return $public;


    }


    win.APP.Services.AsideFilterBooks = AsideFilterBooks();


})( window, document ); 
