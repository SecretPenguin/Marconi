<!DOCTYPE HTML>
<html lang="en">
<head>
<link rel="stylesheet" href="style.css" />
<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<meta charset="utf-8">

</head>
<body>

<ul id="months">
<li><a href="javascript:void(0);">Jan</a></li>
<li><a href="javascript:void(0);">Feb</a></li>
<li><a href="javascript:void(0);">Mar</a></li>
<li><a href="javascript:void(0);">Apr</a></li>
<li><a href="javascript:void(0);">May</a></li>
<li><a href="javascript:void(0);">Jun</a></li>
<li><a href="javascript:void(0);">Jul</a></li>
<li><a href="javascript:void(0);">Aug</a></li>
<li><a href="javascript:void(0);">Sep</a></li>
<li><a href="javascript:void(0);">Oct</a></li>
<li><a href="javascript:void(0);">Nov</a></li>
<li><a href="javascript:void(0);">Dec</a></li>
</ul>

<p>Start Month = <span id="startMonth"></span></p>
<p>End Month = <span id="endMonth"></span></p>
<div id="flexible-container">
	<div id="range"></div>
</div>

<p>Updated End Month = <span id="amount"></span></p>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="../../js/jquery-ui-1.8.21.custom.min.js"></script>
<script>

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* Set Current Month */
var curMonth = 0;
var endMonth = 6;

$('#months a').click(function(){
	curMonth = $(this).parent().index();
	$('#startMonth').html(curMonth);
	$('#endMonth').html(curMonth + 6);
	endMonth = (curMonth + 6);
});

$(function() {
	$( "#range" ).slider({
		range: "min",
		value: 1,
		min: 1,
		max: 18,
		slide: function( event, ui ) {
			var slideVal = ui.value;
			var newEndMonth = endMonth + slideVal;
			$( "#amount" ).html(newEndMonth);
		},
		stop: function( event, ui ) {
			/* Trigger Animate Function */
		}
	});
});
</script>

</body>
</html>