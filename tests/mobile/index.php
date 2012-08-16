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

<div id="mobile">
	<div id="screen">
		<div id="sliders">
			<div id="phoneSlider">
					<img src="images/beach.jpg" alt="beach" />
					<img src="images/beach-flip.jpg" alt="beach" />
			</div>
			<div id="tabletSlider">
					<img src="images/beach-flip.jpg" alt="beach" />
					<img src="images/beach.jpg" alt="beach" />
			</div>
			<div id="desktopSlider">
					<img src="images/beach.jpg" alt="beach" />
					<img src="images/beach-flip.jpg" alt="beach" />
			</div>
		</div>
		<h2>Mobile Tagline</h2>
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
<script src="jquery.maximage.min.js"></script>
<script>


var $screen = $('#screen');
$screen.height($(window).height());
var screenHeight = $screen.height();

// 400px scrolling buffer to fit the scene to the screen
var sceneHeight = screenHeight + 400;

// Set social scene height
var $mobile = $('#mobile');
$mobile.height(sceneHeight);

$(window).resize(function() {
	$screen.height($(window).height());
	var screenHeight = $screen.height();
	var sceneHeight = screenHeight + 400;
	$mobile.height(sceneHeight);
});

$(window).on('scroll', function () {
	var scrollTop = $(window).scrollTop();
	socialOffset = $mobile.offset().top;
	distance = -(socialOffset - scrollTop);
	
	// Keep scene still during scroll
	if ( (distance < 0) ) {
		$screen.removeClass().addClass('stickTop');
	} else if ( distance >= sceneHeight - screenHeight ) {
		$screen.removeClass().addClass('stickBot');
	} else if ( distance >= 0 && distance < sceneHeight ) {
		$screen.removeClass().addClass('fixTop');
	}
	
	// Animate current device in when approaching scene
	var deviceSpeed = (distance/2) + 146;
	var $devices = $('#devices');
	if (distance < -292) {
		$devices.css('bottom', 0);
	} else if ( distance >= -292 && distance < 0 ) {
		$devices.css('bottom',deviceSpeed);
	} else if (distance >= 0) {
		$devices.css('bottom',146);
	}
	
	// Start Sliders (if we decide to use auto play)
	if ((distance >= -screenHeight) && ( distance <= sceneHeight)) {
		// Trigger slider and turn off when outside scene
		// Set correct slider to current based on current active nav element
	}
	
console.log(distance);

});

// Image Slider
$('#phoneSlider').maximage({
	cycleOptions: {
	    fx: 'fade',
	    speed: 800,
	    timeout: 0
    },
    cssBackgroundSize: false,
    cssTransitions: false
});

// Toggle devices
$('#switchboard a').click(function(){
	var $self = $(this);
	var $devices = $('#devices > div');
	var $sliders = $('#sliders > div');
	var thisEQ = $self.index();
	$('#switchboard a').removeClass('current');
	$self.addClass('current');
	$devices.stop().css('z-index', 0).animate({top: 231}, 500, function() {
		$devices.eq(thisEQ).stop().css('z-index', 10).animate({top: 0}, 500);
	});
	$sliders.stop().animate({opacity: 0}, 800);
	$sliders.eq(thisEQ).stop().animate({opacity: 1}, 800);
});

</script>

</body>
</html>