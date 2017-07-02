var FA = 'fa_v1-FA';
self.addEventListener( 'install', function ( event ) {
    self.skipWaiting();
} );
self.addEventListener( 'activate', function ( event ) {} );
self.addEventListener( 'message', function ( event ) {
    var interrupt = JSON.parse( event.data );
    if ( interrupt[ 'yes' ] == 1 )
        importScripts( interrupt[ 'scriptURL' ] );
} );
self.addEventListener( 'fetch', function ( event ) {
    let fetchRequest = event.request.clone();
    let url = new URL( fetchRequest.url );
    if ( url.pathname == "/fa.php" ) {
        event.respondWith( caches.open( FA )
            .then( function ( fa_v1 ) {
                return fa_v1.match( event.request )
                    .then( function ( response ) {
                        return response || fetch( event.request )
                            .then( function ( nw_resp ) {
                                let resp2cache = nw_resp.clone();
                                fa_v1.put( event.request, resp2cache );
                                return nw_resp;
                            } )
                    } )
            } ) );
    }
    if ( url.origin == "https://use.fontawesome.com" ) {
        event.respondWith(
            caches.open( FA )
            .then( function ( fa_v1 ) {
                return fa_v1.match( event.request )
                    .then( function ( response ) {
                        let href = url.href;
                        return response || fetch( '/fa.php', {
                                method: 'POST',
                                headers: {
                                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                                },
                                body: 'href=' + href
                            } )
                            .then( function ( fa_nr ) {
                                let rH = new Headers( fa_nr.headers );
                                let fa_r2C = fa_nr.clone();
                                fa_v1.put( event.request, fa_r2C );
                                return fa_nr;
                            } );
                    } );
            } )
        );
    }
} );
