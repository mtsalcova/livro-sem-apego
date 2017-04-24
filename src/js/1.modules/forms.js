;(function( win, doc ) {
    'use strict';


    win.APP.Modules.Forms = Forms();


    function Forms() {

        var $public  = {};

        $public.validate = function validate(fields) {
            console.log(fields);
        }

        return $public;

    }


})( window, document ); 
