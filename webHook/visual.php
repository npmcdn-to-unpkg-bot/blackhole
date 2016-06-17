<?php

include("credentials.php");

if( !pg_pconnect("host=localhost port=5432 dbname=$database user=$username password=$password") ){
	print "no database connection";
	exit(20);
}

$res = pg_fetch_all(
		pg_query("SELECT * FROM data")
	);

if(!$res){
	print pg_last_error();
	print "no database connection";
	exit(20);
}

print "<table border=1>";
foreach($res as $obj)
{
	print "<tr>";
	print "<td>".$obj['event']."</td>";
	print "<td>".$obj['data']."</td>";
	print "<td>".$obj['published']."</td>";
	print "<td>".$obj['coreid']."</td>";
	print "<td>".$obj['recorded']."</td>";
	print "</tr>";
}
print "</table>";
