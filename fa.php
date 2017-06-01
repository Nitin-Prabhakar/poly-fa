<?php
if(isset($_POST['getFA']) && $_POST['getFA']==1){
  // init the resource
$ch = curl_init();

// set options...
curl_setopt($ch, CURLOPT_URL, "https://use.fontawesome.com/4ed3881c04.css");
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

// execute
$output = curl_exec($ch);
$fa = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR."fa.css";
if(file_exists($fa))
  unlink( $fa );
$poly_fa = fopen($fa, "w+");
fwrite($poly_fa, $output);
fclose($poly_fa);
// free
curl_close($ch);
echo "fetched";
}
exit;
 ?>
