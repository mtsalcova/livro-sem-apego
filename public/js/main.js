
(function() {
    var filter = document.querySelector('.icon-filter');
    if(!filter) {
        return false;
    }

    filter.addEventListener('click', function() {

        window.scrollTo(0,0);

        var booksContainer = document.querySelector('.books-container');
        booksContainer.classList.toggle( 'active' );

    }, false);

})();
