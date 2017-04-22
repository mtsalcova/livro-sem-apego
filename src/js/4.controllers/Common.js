;(function( win, doc ) {
    'use strict';



    function Common() {

        var $public  = {};

        $public.init = function init() {
            APP.Services.HeaderAnimateScroll.init();
        }

        return $public;

    }


    win.APP.Ctrls.Common = Common();


})( window, document ); 
