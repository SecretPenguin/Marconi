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

Notes:<br/>
Month Range - Display the next set of months starting at the current month<br/>
Credits - Possibly run some simple math to give people an idea of credit hours per month<br/>
<br/>
Resources:<br/>
<a href="http://jqueryui.com/demos/slider/">http://jqueryui.com/demos/slider/</a><br/>
<br/>

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

<p>Start Month = <span id="startMonth">January</span></p>
<p>End Month = <span id="endMonth">July</span></p>
<p>Duration = <span id="durYears">1 Year</span> <span id="durMonths">6 Months</span></p>
<div id="flexible-container">
	<div id="credits">
		<div>&copy;</div>
		<div>&copy;</div>
		<div>&copy;</div>
		<div>&copy;</div>
		<div>&copy;</div>
		<div>&copy;</div>
		<div>&copy;</div>
		<div>&copy;</div>
		<div>&copy;</div>
		<div>&copy;</div>
	</div>
	<div id="range"></div>
</div>

<div id="animate">
	<div id="January">Janimation!</div>
	<div id="February">Februamation!</div>
	<div id="March">March Animation!</div>
	<div id="April">April Animation!</div>
	<div id="May">Maytion!</div>
	<div id="June">June Animation!</div>
	<div id="July">July Animation!</div>
	<div id="August">August Animation!</div>
	<div id="September">September Animation!</div>
	<div id="October">October Animation!</div>
	<div id="November">November Animation!</div>
	<div id="December">December Animation!</div>
</div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="../../js/jquery-ui-1.8.22.custom.min.js"></script>
<script>

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Set Global Month Variables
var curMonth = 0;
var endMonth = 6;

var $endMonthText = $('#endMonth');

// Set Current Month and Minimum End Month 
$('#months a').click(function(){
	curMonth = $(this).parent().index();
	$('#startMonth').html(months[curMonth]);
	// Minimum End Month is 18 Months after Start
	if (curMonth > 5) {
		endMonth = (curMonth -6);
	} else {
		endMonth = (curMonth + 6);
	}
	$endMonthText.html(months[endMonth]);
});

// Range Slider set to 18 month range
$('#range').slider({
	range: 'min',
	value: 1,
	min: 1,
	max: 18,
	slide: function( event, ui ) {
		// Start Date Range at 0
		var dateOffset = ui.value - 1;
		// Update End Month
		var newEndMonth = (endMonth + dateOffset)%12;
		$endMonthText.html(months[newEndMonth]);
		
		// Set Total Time to complete program
		// Years
		var durYears = Math.floor((18 + dateOffset)/12);
		var $totalYears = $('#durYears');
		if (durYears < 2) {
			$totalYears.html(durYears+' Year');
		} else {
			$totalYears.html(durYears+' Years');
		}
		// Months
		var durMonths = ((18 + dateOffset)%12);
		var $totalMonths = $('#durMonths');
		if (durMonths > 1) {
			$totalMonths.html(durMonths+' Months');
		} else if (durMonths == 1) {
			$totalMonths.html(durMonths+' Month');
		} else if (durMonths == 0) {
			$totalMonths.html('');
		}
		
		// Set CSS width of Credits to expand with slider
		var creditWidth = 263 + (16 * dateOffset);
		$('#credits').css('width', creditWidth);
	},
	stop: function( event, ui ) {
		// Trigger Animation
		var monthID = $endMonthText.text();
		$('#animate div').hide();
		$('#'+monthID).fadeIn();
	}
});
</script>

</body>
</html>