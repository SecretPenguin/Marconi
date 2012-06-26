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

<p>Start Month = <span id="startMonth">January</span></p>
<p>End Month = <span id="endMonth">July</span></p>
<div id="flexible-container">
	<div id="credits">
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
		<div class="credit">&copy;</div>
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
<script src="../../js/jquery-ui-1.8.21.custom.min.js"></script>
<script>

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* Set Current Month */
var curMonth = 0;
var endMonth = 6;

$('#months a').click(function(){
	curMonth = $(this).parent().index();
	$('#startMonth').html(months[curMonth]);
	endMonth = (curMonth + 6);
	$('#endMonth').html(months[endMonth]);
});

$('#range').slider({
	range: 'min',
	value: 1,
	min: 1,
	max: 18,
	slide: function( event, ui ) {
		var dateOffset = ui.value - 1;
		var newEndMonth = endMonth + dateOffset;
		if (newEndMonth > 35) {
			newEndMonth = newEndMonth - 36;
		} else if (newEndMonth > 23) {
			newEndMonth = newEndMonth - 24;
		} else if (newEndMonth > 11) {
			newEndMonth = newEndMonth - 12;
		}
		$('#endMonth').html(months[newEndMonth]);
		var creditWidth = 263 + (16 * dateOffset);
		$('#credits').css('width', creditWidth);
	},
	stop: function( event, ui ) {
		/* Trigger Animate Function */
		var monthID = $('#endMonth').text();
		$('#animate div').hide();
		$('#'+monthID).fadeIn();
	}
});
</script>

</body>
</html>