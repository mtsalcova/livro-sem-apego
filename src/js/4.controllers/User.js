;(function( win, doc ) {
    'use strict';


    win.APP.Ctrls.User = User();


    function User() {

        var $public = {};

        $public.init = function init() {
            APP.Services.ToggleMenuUser.init();
        }

        return $public;

    }


})( window, document ); 
