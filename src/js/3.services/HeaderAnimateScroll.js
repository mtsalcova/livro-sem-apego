;(function( win, doc ) {
    'use strict';


    function HeaderAnimateScroll() {

        var $public  = {};
        var $private = {};


        $public.init = function init() {
            // console.log('chegou até mim');
        }

        return $public;

    }


    win.APP.Services.HeaderAnimateScroll = HeaderAnimateScroll();


})( window, document ); 
