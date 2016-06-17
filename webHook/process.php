<?php

include("credentials.php");

// validate
$input['event'] = $_POST['event'];
$input['data'] = $_POST['data'];
$input['published'] = $_POST['published_at'];
$input['coreid'] = $_POST['coreid'];

if( !validate($input) ){
	print "bad input";
	exit(19);
}

// connect to database. 
if( !pg_pconnect("host=localhost port=5432 dbname=$database user=$username password=$password") ){
	print "no database connection";
	exit(20);
}
print_r($input);
$res = pg_query_params("INSERT INTO data (data, coreid, published, event)
	values ($1, $2, $3, $4)", [$input['data'],$input['coreid'], $input['published'], $input['event']]);

if(!$res){
	print pg_last_error();
}

function validate($in){

	$retval = false;
	$coreid = split('_', $in['coreid']);
	if( $coreid[0] != 001 || $coreid[1] != '57546cf9e45f96974413fd56' ){
		return false;
	}

	$now = new DateTime();
	$then = new DateTime($in['published']);
	
	if($then > $now)
	{
		return false;
	}
	
	if(!in_array($in['event'], array('temp', 'imu', 'pressure')))
	{
		return false;
	}
	return true;
} 	
