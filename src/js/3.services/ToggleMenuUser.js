;(function( win, doc ) {
    'use strict';


    win.APP.Services.ToggleMenuUser = ToggleMenuUser();


    function ToggleMenuUser() {

        var $public  = {};
        var $private = {};


        $public.init = function init() {
            $private.setEvent();
        }


        $private.aside = doc.querySelector('.sidebar');
        $private.btn = doc.querySelector('.sidebar > .btn');


        $private.setEvent = function setEvent() {

            $private.btn.addEventListener('click', function() {

                if( $private.aside.classList.contains('active')) {
                    $private.aside.classList.remove('active');
                    return $private.aside.removeAttribute('style');
                }

                var height = 0;
                var sidebarNav = doc.querySelector('.sidebar-nav');
                height += sidebarNav.getBoundingClientRect().height;
                height += $private.btn.getBoundingClientRect().height;

                $private.aside.classList.add('active');
                $private.aside.style.height = height + "px";

            }, false);

        }

      
        return $public;

    }


})( window, document ); 
