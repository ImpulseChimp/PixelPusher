<?php

// Use Loader() to autoload our model
$loader = new \Phalcon\Loader();

$loader->registerDirs(array(
          '/models/'
))->register();

$di = new \Phalcon\DI\FactoryDefault();

//Set up the database service
$di->set('modelsManager', function(){
	return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
			"host" => "localhost",
			"username" => "addhawk",
			"password" => "addhawk4784",
			"dbname" => "addhawk"
	));
});

//Create new Micro application and router
$router = new Phalcon\Mvc\Micro($di);

/*
  This route MATCHES ALL VALID API REQUESTS to a model
  URL: :host/api/model/method/parameters
  HTTP Methods: { GET, POST }
  PRE: $model and $method can only contain letter, numbers, '-', and '_' symbols
  POST: Valid JSON Response is returned
*/
$router->map('/{model:[A-Za-z0-9_-]+}/{method:[A-Za-z0-9_-]+}/{parameters}', function($model, $method, $parameters) use ($router){

	//Build request obj
	include "lib/request.php";
	$request = new Request($model, $method, $parameters);

	//Prepare response obj
	$response = new Phalcon\Http\Response();

	$api_obj; //Pre define for if-else if block

	//Call corresponding API below if possible
  if($model == "user") {
		include "/lib/user_api.php";
		$api_obj = new UserApi($request, $response, $router);
		$response = $api_obj->executeRequest();
	}
	else if($model == "admin") {
		include "/lib/admin_api.php";
		$api_obj = new AdminApi($request, $response, $router);
		$response = $api_obj->executeRequest();
	}
	else {
		$response->setStatusCode(405, "Model Not Found");
	}

	//Send response from api
	$response->send();
});


/*
  The routes below catch all invalid api calls
  HTTP Methods: { GET, POST }
*/
$router->map('/{model}/{method}', function($model, $method){
  echo "PixelPusher API</br>";
  echo "Model: ".$model."</br>";
  echo "Method: ".$method;
});

//Incomplete api call catch
$router->map('/{model}', function($model){
  echo "PixelPusher API"."</br>";
  echo "Model: ".$model;
});

$router->notFound(function () use ($router) {
    $router->response->setStatusCode(404, "Not Found")->sendHeaders();
    echo 'This is crazy, but this page was not found! API 404';
});

$router->handle();
