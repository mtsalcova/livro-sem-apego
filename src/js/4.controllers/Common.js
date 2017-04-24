;(function( win, doc ) {
    'use strict';


    win.APP.Ctrls.Common = Common();


    function Common() {

        var $public = {};

        $public.init = function init() {
            APP.Services.Newsletter.init();
        }

        return $public;

    }


})( window, document ); 
