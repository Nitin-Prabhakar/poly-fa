var FA = 'fa_v1-FA';

self.addEventListener( 'install', function ( event ) {
	self.skipWaiting();
} );
self.addEventListener( 'activate', function ( event ) {
	event.waitUntil( self.clients.claim()
		.then( function () {
			console.log( 'font awesome service worker activated' );
		} ) )
} );
self.addEventListener( 'message', function ( event ) {
	let interrupt = JSON.parse( event.data );
} );

function cFnL( event ) {
	let cache = this;
	return cache.match( event.request )
		.then( function ( response ) {
			return response || fetch( event.request )
				.then( function ( nw_resp ) {

					var noCache = false;
					if ( nw_resp.status == 200 && nw_resp.type == 'basic' ) {
						let resp2cache = nw_resp.clone();
						let headers = new Headers( nw_resp.headers );
						if ( headers.has( 'Cache-Control' ) ) {
							let _cc = headers.get( 'Cache-Control' )
								.toLowerCase();
							var _noStore = ( _cc.indexOf( 'no-store', 0 ) === -1 ) ? false : true;
							var _noCache = ( _cc.indexOf( 'no-cache', 0 ) === -1 ) ? false : true;
							var _revalidate = ( _cc.indexOf( 'must-revalidate', 0 ) === -1 ) ? false : true;
							var _conditional_cache = _noCache && _revalidate;
							noCache = _conditional_cache || _noStore;
						}
						if ( noCache !== true ) {
							cache.put( event.request, resp2cache )
								.catch( function ( err ) {
									console.log( err );
								} );
						}
					}
					return nw_resp;
				} )
		} )
}
self.addEventListener( 'fetch', function ( event ) {
	let url = new URL( event.request.url );
	if ( event.request.url.endsWith( 'fa.html' ) ) {
		event.respondWith( caches.open( FA )
			.then( cache => {
				return cFnL.call( cache, event );
			} ) )
	}
	if ( url.origin.match( '.*(poly-style.appspot.com)$' ) ) {
		event.respondWith( caches.open( FA )
			.then( function ( cache ) {
				return cache.match( event.request )
					.then( response => {
						return response || fetch( event.request )
							.then( cor_resp => {
								if ( cor_resp.status == 200 ) {
									cache.put( event.request, cor_resp.clone() );
								}
								return cor_resp;
							} )
					} )
			} ) )
	}
} );
