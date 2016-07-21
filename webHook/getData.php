<?php

include("credentials.php");

// validate
$input = $_POST['data'];

if( !validate($input) ){
	print "bad input";
	exit(19);
}

// connect to database.
if( !pg_pconnect("host=localhost port=5432 dbname=$database user=$username password=$password") ){
	print "no database connection";
	exit(20);
}

$res = 	pg_query("SELECT * FROM data_full ORDER BY date_time DESC limit 10");


if(!$res){
	print pg_last_error();
}

$data = json_encode( pg_fetch_all($res) );

print $data;

function validate($in){
	return true;
}
