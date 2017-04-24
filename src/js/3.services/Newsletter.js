;(function( win, doc ) {
    'use strict';


    win.APP.Services.Newsletter = Newsletter();

    
    function Newsletter() {

        var $public  = {};
        var $private = {};

        $public.init = function init() {
            $private.setEvent();
        }

        $private.setEvent = function setEvent() {
        
        }

        return $public;

    }


})( window, document ); 
