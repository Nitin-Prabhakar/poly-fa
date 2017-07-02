<?php
$dsq  = [];
function getDownstream( $h,$ds ) {
    global $dsq;
    if(  trim(  $ds  )  ) {
        $_transmission_chunks = explode(  ":", $ds, 2  );
        $_trimmed_transmission_chunks = array_map(  'trim', $_transmission_chunks  );
        if ( count( $_trimmed_transmission_chunks ) == 2 ) {
          $dsq[ $_trimmed_transmission_chunks[ 0 ] ] = $_trimmed_transmission_chunks[ 1 ];
      } else {
          $dsq[] = trim(  $ds  );
      }
    }

    return strlen(  $ds  );
}
if( isset( $_REQUEST[ 'href' ] ) && !empty( $_REQUEST[ 'href' ] ) ) {
      $ch_href = curl_init( );

      // set options...
      curl_setopt( $ch_href, CURLOPT_URL, $_REQUEST[ 'href' ] );
      curl_setopt( $ch_href,CURLINFO_HEADER_OUT,true );
      curl_setopt( $ch_href,CURLOPT_RETURNTRANSFER,true );
      curl_setopt( $ch_href, CURLOPT_HEADERFUNCTION, 'getDownstream'  );
      $output_href = curl_exec( $ch_href );
      $headers = $dsq;//curl_getinfo( $ch_href );
      curl_close( $ch_href );
      header( "Cache-Control:".$headers[ 'Cache-Control' ] );
      header( "Content-Type:".$headers[ 'Content-Type' ] );
      header( "Content-Length:".$headers[ 'Content-Length' ] );
      echo $output_href;
}
exit;
 ?>
