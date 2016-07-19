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
$res = pg_query_params("insert into data_full (date_time, x) values($2, $1)", [$clean['X'], 'now()']);
if(!$res){
        print pg_last_error();
}
function validate($in){
  return true;
}
