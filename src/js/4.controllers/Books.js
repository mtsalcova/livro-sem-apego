;(function( win, doc ) {
    'use strict';



    function Books() {

        var $public  = {};

        $public.init = function init() {
            APP.Services.AsideFilterBooks.init();
        }

        return $public;

    }


    win.APP.Ctrls.Books = Books();


})( window, document ); 
