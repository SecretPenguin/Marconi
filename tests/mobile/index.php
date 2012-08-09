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
<div class="space">
	<div class="center">Test</div>
</div>

<div id="social">
	<div id="screen">
		<div id="slider">
			<div id="phoneSlides">
				<img src="images/beach.jpg" alt="beach" />
				<img src="images/beach-flip.jpg" alt="beach" />
			</div>
			<div id="tabletSlides">
				<img src="images/beach-flip.jpg" alt="beach" />
				<img src="images/beach.jpg" alt="beach" />
			</div>
			<div id="desktopSlides">
				<img src="images/beach.jpg" alt="beach" />
				<img src="images/beach-flip.jpg" alt="beach" />
			</div>
		</div>
		<h2>Social Tagline</h2>
		<div id="devices" class="center">
			<div id="phone"></div>
			<div id="tablet"></div>
			<div id="desktop"></div>
		</div>
		<div id="switchboard">
			<div class="center">
				<a id="showPhone" class="current" href="javascript:void(0);">Phone</a>
				<a id="showTablet" href="javascript:void(0);">Tablet</a>
				<a id="showDesktop" href="javascript:void(0);">Desktop</a>
			</div>
		</div>
	</div>
</div>
<div class="space">
	<div class="center">Test</div>
</div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="jquery.cycle.all.js"></script>
<script>


$('#screen').height($(window).height());
var screenHeight = $('#screen').height();

var sceneHeight = screenHeight + 400;
// Set scene height
$('#social').height(sceneHeight);

$(window).resize(function() {
	$('#screen').height($(window).height());
	var screenHeight = $('#screen').height();
	var sceneHeight = screenHeight + 400;
	$('#social').height(sceneHeight);
});

$(window).on('scroll', function () {
	var scrollTop = $(window).scrollTop();
	socialOffset = $('#social').offset().top;
	distance = -(socialOffset - scrollTop);
	
	// Keep scene still during scroll
	if ( (distance < 0) ) {
		$('#screen').removeClass().addClass('stickTop');
	} else if ( distance >= sceneHeight - screenHeight ) {
		$('#screen').removeClass().addClass('stickBot');
	} else if ( (distance >= 0) && (distance < sceneHeight) ) {
		$('#screen').removeClass().addClass('fixTop');
	}
	
	// Animate current device in when approaching scene
	var deviceSpeed = (distance/2) + 146;
	if (distance < -292) {
		$('#devices').css('bottom', 0);
	} else if ((distance >= -292) && (distance < 0)) {
		$('#devices').css('bottom',deviceSpeed);
	} else if (distance >= 0) {
		$('#devices').css('bottom',146);
	}
	
	// Start Sliders
	if ((distance >= -screenHeight) && ( distance <= sceneHeight)) {
		// Trigger slider and turn off when outside scene
		// Set correct slider to current based on current active nav element
	}
	
console.log(distance);

});

$('#slider > div').cycle({
    fx: 'fade',
    speed: 800,
    timeout: 6000
});

/*
$('#slider').cycle({
    fx: 'fade',
    speed: 500,
    timeout: 0,
    manualTrump: false,
    before: onBefore,
    after: onAfter,
    pager: '#nav',
    cleartype: true,
    cleartypeNoBg: true,
    pagerAnchorBuilder: function(idx, slide) {
    	return '#switchboard a:eq(' + idx + ')';
    }
});
*/

// Toggle devices
// Toggle phone
$('#showPhone').click(function(){
	$('#switchboard a').removeClass('current');
	$(this).addClass('current');
	$('#devices div').stop().css('z-index', 0).animate({top: 231}, 500, function() {
		$('#phone').css('z-index', 10).animate({top: 0}, 500);
	});
});
// Toggle tablet
$('#showTablet').click(function(){
	$('#switchboard a').removeClass('current');
	$(this).addClass('current');
	$('#devices div').stop().css('z-index', 0).animate({top: 231}, 500, function() {
		$('#tablet').css('z-index', 10).animate({top: 0}, 500);
	});
});
// Toggle desktop
$('#showDesktop').click(function(){
	$('#switchboard a').removeClass('current');
	$(this).addClass('current');
	$('#devices div').stop().css('z-index', 0).animate({top: 231}, 500, function() {
		$('#desktop').css('z-index', 10).animate({top: 0}, 500);
	});
});

</script>

</body>
</html>