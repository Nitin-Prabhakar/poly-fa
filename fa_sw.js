var FA = 's-0-q-cache-FA';
self.addEventListener( 'install', function ( event ) {
    self.skipWaiting();
    fetch( '/fa.php', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'getFA=1'
        } )
        .then( function ( response ) {
            caches.open( FA )
                .then( function ( cache ) {
                    return cache.addAll( [ '/fa.css' ] );
                } )
        } );
} );
self.addEventListener( 'activate', function ( event ) {} );
self.addEventListener( 'message', function ( event ) {
    var interrupt = JSON.parse( event.data );
    if ( interrupt[ 'yes' ] == 1 )
        importScripts( interrupt[ 'scriptURL' ] );
} );
self.addEventListener( 'fetch', function ( event ) {
    var fetchRequest = event.request.clone();
    const url = new URL( fetchRequest.url );
    if ( url.pathname == "/fa.css" ) {
        event.respondWith(
            caches.match( event.request )
            .then( function ( response ) {
                //cache hit
                if ( response )
                    return response;
                //BEGIN not in cache

                return (
                        /*Do a fresh network request for the url requested*/
                        fetch( fetchRequest )
                    )
                    .then( function ( response ) {
                        //check if network request generated a 200 OK and / or is a same Origin Request - DO NOT CACHE if not
                        if ( !response || response.status !== 200 || response.type !== 'basic' )
                            return response;
                        var responseToCache = response.clone();
                        caches.open( Externals )
                            .then( function ( cache ) {
                                cache.put( fetchRequest, responseToCache );
                            } );
                        return response;
                    } );
                //END not in cache
            } )
        );
    }
} );
