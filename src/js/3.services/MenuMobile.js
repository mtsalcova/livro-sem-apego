;(function( win, doc ) {
    'use strict';


    win.APP.Services.MenuMobile = MenuMobile();


    function MenuMobile() {

        var $public  = {};
        var $private = {};


        $public.init = function init() {
            $private.setEvent();
        }

        var btn = doc.querySelector('.header-fixed .icon');
        var menu = doc.querySelector('.menu-mobile');
        var close = doc.querySelector('.menu-mobile .icon');
        var itemsMenu = doc.querySelector('.menu-mobile .items');

        $private.setEvent = function setEvent() {

            btn.addEventListener('click', function() {
                menu.classList.add('-active');
                setTimeout(function() {
                    itemsMenu.classList.add('-active');
                }, 300);
            }, false);
            
            menu.addEventListener('click', function(e) {
                $private.removeClass();
            }, false);

            menu.addEventListener('click', function(e) {
                if ( e.target.classList.contains('icon') ) return $private.removeClass();
                e.stopPropagation();
            }, true);

        }


        $private.removeClass = function removeClass() {
            itemsMenu.classList.remove('-active');
            setTimeout(function() {
                menu.classList.remove('-active')
            }, 300);
        }

      
        return $public;

    }


})( window, document ); 
