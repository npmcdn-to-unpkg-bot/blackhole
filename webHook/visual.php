<html>
<head>
<meta charset="utf-8">  <!-- it's important for d3.js -->
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/d3/d3.js"></script>
<script src="bower_components/nvd3/build/nv.d3.js"></script> <!-- or use another assembly -->
<script src="bower_components/angular-nvd3/dist/angular-nvd3.js"></script>
<script src="app.js"></script> 
<script src="lineChart.js"></script> 
<link rel="stylesheet" href="bower_components/nvd3/build/nv.d3.css">
</head>
<body>

<div ng-app="mainApp">
    <div ng-controller="lineChartCtrl">
        <nvd3 options="options" data="data"></nvd3>
    </div>
</div>
<?php
include("credentials.php");

if( !pg_pconnect("host=localhost port=5432 dbname=$database user=$username password=$password") ){
	print "no database connection";
	exit(20);
}

$res = pg_fetch_all(
	 	pg_query("select x, y, z, extract(epoch from date_time)/10000000 as date_time from data_full")
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
	print "<td>".$obj['date_time']."</td>";
	print "<td>".$obj['x']."</td>";
	print "<td>".$obj['y']."</td>";
	print "<td>".$obj['z']."</td>";
	print "</tr>";
}
print "</table>";
?>
<body>
</html>
