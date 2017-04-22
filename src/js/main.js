
//
// Esse Módulo Pattern foi baseado no link: :)
// http://blog.da2k.com.br/2015/02/13/escalando-javascript-no-browser/
// Valeu Fernando Daciuk! :)
//


;(function( win, doc ) {
    'use strict';


    function main() {

        var $public  = {};
        var $private = {};


        $public.init = function init() {
            $private.loadCtrls();
        }


        $private.loadCtrls = function routers() {
            
            var ctrlsList = ['Common'];
            var body = doc.body;

            if( body.hasAttribute('data-js') ) {
                var dataJS = body.getAttribute('data-js');
                ctrlsList.push(dataJS);
            }

            ctrlsList.forEach(function(ctrl) {
                if( typeof APP.Ctrls[ctrl] !== "undefined" ) {
                    return APP.Ctrls[ctrl].init();
                };
            });

        }

        return $public;

    }

    main().init();
    

})( window, document ); 
