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

$full = explode(' ',$input);
foreach($full as $temp){
 $b = explode(':', $temp);
 $clean[$b[0]] = $b[1];
}
$res = pg_query_params("insert into data_full 
	(date_time, x, y, z, temp, pressure, altitude, humidity)
    values($1, $2, $3, $4, $5, $6, $7, $8)"
 	, ['now()', $clean['X'], $clean['Y'], $clean['Z'], $clean['temp'], $clean['press'], $clean['alti'], $clean['humd']]
);


if(!$res){
        print pg_last_error();
}
function validate($in){
	return true;
}
