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

<div id="timeline">
	<div id="fast">
		<!-- Use this as drop down to select start month - Make first Month be the next calendar month -->
		<select id="startMonth">
			<option>January</option>
			<option>February</option>
			<option>March</option>
			<option>April</option>
			<option>May</option>
			<option>June</option>
			<option>July</option>
			<option>August</option>
			<option>September</option>
			<option>October</option>
			<option>November</option>
			<option>December</option>
		</select>
		<!-- Make this bar wider if earlier end date is selected -->
		<div class="bar"></div>
		<a id="fastEnd" class="toggleEnd" href="javascript:void(0);"></a>
		<a id="fastMonth" href="javascript:void(0);"></a>
	</div>
	<div id="normal" class="currentEnd">
		<!-- Breaks will display a scrolling background over a 6 month session and update depending on the months during that session -->
		<div id="breaks"></div>
		<div class="bar"></div>
		<a id="normalEnd" class="toggleEnd" href="javascript:void(0);"></a>
		<a id="normalMonth" href="javascript:void(0);"></a>
	</div>
	<div id="animations">
		<div id="January">January Animation!</div>
		<div id="February">February Animation!</div>
		<div id="March">March Animation!</div>
		<div id="April">April Animation!</div>
		<div id="May">May Animation!</div>
		<div id="June">June Animation!</div>
		<div id="July">July Animation!</div>
		<div id="August">August Animation!</div>
		<div id="September">September Animation!</div>
		<div id="October">October Animation!</div>
		<div id="November">November Animation!</div>
		<div id="December">December Animation!</div>
	</div>
	<div class="clear"></div>
</div>
<div id="taglines">
	<div>This is where the taglines go.<br/>January Tagline</div>
	<div>This is where the taglines go.<br/>February Tagline</div>
	<div>This is where the taglines go.<br/>March Tagline</div>
	<div>This is where the taglines go.<br/>April Tagline</div>
	<div>This is where the taglines go.<br/>May Tagline</div>
	<div>This is where the taglines go.<br/>June Tagline</div>
	<div>This is where the taglines go.<br/>July Tagline</div>
	<div>This is where the taglines go.<br/>August Tagline</div>
	<div>This is where the taglines go.<br/>September Tagline</div>
	<div>This is where the taglines go.<br/>October Tagline</div>
	<div>This is where the taglines go.<br/>November Tagline</div>
	<div>This is where the taglines go.<br/>December Tagline</div>
</div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="jquery.backgroundpos.min.js"></script>
<script>

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Set Global Month Variables
var	curMonth = 0;
var endMonth = 5;
var endMonth2 = 11;

var $fastEndText = $('#fastMonth');
var $normalEndText = $('#normalMonth');

// Trigger animation
function loadMonthAssets() {
	$('#animations div').hide();
	$('#taglines div').hide();
	if ($('#normal').hasClass('currentEnd')) {
		$('#animations div').stop().delay('500').eq(endMonth2).fadeIn();
		$('#taglines div').stop().delay('500').eq(endMonth2).fadeIn();
	} else {
		$('#animations div').stop().delay('500').eq(endMonth).fadeIn();
		$('#taglines div').stop().delay('500').eq(endMonth).fadeIn();
	}
}

/*
function callTagline() {
	$('#taglines div').fadeOut('500');
	if ($('#normal').hasClass('currentEnd')) {
		$('taglines div').stop().delay('500').eq(endMonth2).fadeIn();
	} else {
		$('taglines div').stop().delay('500').eq(endMonth).fadeIn();
	}
}
*/

// Stuff to do on initial load
loadMonthAssets();
$fastEndText.html('End of ' + months[endMonth]);
$normalEndText.html('End of ' + months[endMonth2]);

// Update months on change
$('#startMonth').change(function(){
	curMonth = $('#startMonth option:selected').index();
	
	// fast month
	if (curMonth > 6) {
		endMonth = (curMonth - 7);
	} else {
		endMonth = (curMonth + 5);
	}
	// normal month
	if (curMonth == 0) {
		endMonth2 = (curMonth + 11);
	} else {
		endMonth2 = (curMonth - 1);
	}

	$fastEndText.html('End of ' + months[endMonth]);	
	$normalEndText.html('End of ' + months[endMonth2]);
	
	// animate break background
	var updateBreak = -curMonth*80;
	$('#breaks').animate({backgroundPosition: updateBreak + 'px center'}, 500);
	
	// Update sprite
	loadMonthAssets();
});

// Display normal timeline
$('#normalEnd, #normalMonth').click(function(){
	$('#normal').animate({opacity: 1}, 500).addClass('currentEnd');
	$('#fast .bar').animate({height: '3px', bottom: '75px'}, 300);
	$('#animations').css('right', '0');
	loadMonthAssets();
});

// Display fast timeline
$('#fastEnd, #fastMonth').click(function(){
	$('#normal').animate({opacity: 0.35}, 500).removeClass();
	$('#fast .bar').animate({height: '7px', bottom: '73px'}, 300);
	$('#animations').css('right', '480px');
	loadMonthAssets();
});

</script>

</body>
</html>