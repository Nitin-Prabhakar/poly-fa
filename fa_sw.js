var FA = 's-0-q-cache-FA';
self.addEventListener( 'install', function ( event ) {
    self.skipWaiting();
    fetch( 'https://use.fontawesome.com/4ed3881c04.css', {
            mode: 'no-cors'
        } )
        .then( function ( stylesheet ) {
            console.log( stylesheet, stylesheet.text() );
        } );
} );
self.addEventListener( 'activate', function ( event ) {} );
self.addEventListener( 'message', function ( event ) {
    var interrupt = JSON.parse( event.data );
    if ( interrupt[ 'yes' ] == 1 )
        importScripts( interrupt[ 'scriptURL' ] );
} );
