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
<div id="output"></div>
<div class="space"></div>

<div id="walking">
	<div id="screen">
		<div id="person"></div>
		<div id="wall"></div>
		<div id="projectile"></div>
	</div>
</div>

<div class="space"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>

$('#screen').height($(window).height());
var screenHeight = $('#screen').height();
var walkingHeight = $('#walking').height();
var difHeight = (screenHeight - walkingHeight);

$(window).on('scroll', function () {
	var scrollTop = $(window).scrollTop(),
	walkingOffset = $('#walking').offset().top,
	distance = (walkingOffset - scrollTop);
	
	if ( (distance > 0) ) {
		$('#screen').removeClass().addClass('stickTop');
	} else if ( distance <= difHeight ) {
		$('#screen').removeClass().addClass('stickBot');
	} else if ( (distance <= 0) && (distance > difHeight) ) {
		$('#screen').removeClass().addClass('fixTop');
	}
});

</script>

</body>
</html>