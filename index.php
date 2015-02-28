<?php

require('../vendor/autoload.php');

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Our web handlers

$app->get('/', function() use($app) {
	 $app['monolog']->addDebug('logging output.');
    return file_get_contents('game.php');
});
$app->post('/', function(Request $request) use($app) {
  $app['monolog']->addDebug('logging output.');
    return file_get_contents('game.php');;
});
$app->post('/paymentCallback.php', function(Request $request) use($app) {
  $app['monolog']->addDebug('logging output.');
	require('paymentCallback.php');
	$request = $request->get('signed_request');
	$request_type = $request->get('method');
    return handlePayRequest($request,$request_type);;
});

$app->get('/assets/{parent}/{name}', function( $parent,$name,Request $request ) use ( $app ) {
	$full_name = 'assets/'.$parent.'/'.$name;
	if ( !file_exists( $full_name ) )
	{
		throw new \Exception( 'File not found -> '.$full_name );
	}
	$data = file_get_contents($full_name);
	if($parent=='image'){
		$out = new Response($data, 200, array('Content-type' => 'image/jpeg'));
	}else if($parent=='sound'){
		$out = new Response($data, 200, array('Content-type' => 'audio/mpeg'));
	}
	return $out;
});
$app->get('/scripts/{name}', function($name,Request $request ) use ( $app ) {
	$full_name = 'scripts/'.$name;
	if ( !file_exists( $full_name ) )
	{
		throw new \Exception( 'File not found -> '.$full_name );
	}
	$data = file_get_contents($full_name);
	$out = new Response($data, 200, array('Content-type' => 'text/javascript'));
	return $out;
});


$app->run();

?>