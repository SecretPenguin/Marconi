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
<script src="jquery.backgroundpos.min.js"></script>
<script>

var sceneHeight = 5000;

$('#screen').height($(window).height());
var screenHeight = $('#screen').height();
$('#walking').height(screenHeight + sceneHeight);
var walkingHeight = $('#walking').height();
var difHeight = (walkingHeight - screenHeight);
/* var totalHeight = (walkingHeight + screenHeight); */


$(window).resize(function() {
	$('#screen').height($(window).height());
	var screenHeight = $('#screen').height();
	$('#walking').height(screenHeight + sceneHeight);
	var walkingHeight = $('#walking').height();
	var difHeight = (walkingHeight - screenHeight);
	/* var totalHeight = (walkingHeight + screenHeight); */
});

$(window).on('scroll', function () {
	var scrollTop = $(window).scrollTop(),
	walkingOffset = $('#walking').offset().top,
	distance = -(walkingOffset - scrollTop);
	
	/* Keep scene still during scroll */
	if ( (distance < 0) ) {
		$('#screen').removeClass().addClass('stickTop');
	} else if ( distance >= difHeight ) {
		$('#screen').removeClass().addClass('stickBot');
	} else if ( (distance >= 0) && (distance < difHeight) ) {
		$('#screen').removeClass().addClass('fixTop');
	}
	
	var animOrigin = 0; /* Element offset */
	var animTrigger = 1;
	var animSpeed = 2; /* Default Speed updates number at 1/2 rate of pixels scroll - keep full pixel movement to trigger sprites */
	var animUpdate;
	function myCalc() {
		animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
	}
	
	var spriteSpeed = 10; /* Pixels scrolled between sprite triggers */
	var spriteNum = 5; /* Number of sprites in animation */
	var spriteUpdate = 0;
	function mySprite() {
		spriteUpdate = Math.abs((Math.ceil(distance/spriteSpeed))%spriteNum); /* Example: at 250px scrolled 25 frames will have switched and 5 complete animation cycles will have occurred */
	}
	
	if ( distance >= 500 ) {
		/* animation */
		animOrigin = -50;
		animTrigger = 500; /* Same as start position in if statement */
		animSpeed = 2;
		myCalc();
		$('#projectile').css('right', animUpdate);
	} else {
		$('#projectile').css('right', '-50px');
	}
	
	if ( distance >= 500 ) {
		animOrigin = 75;
		animTrigger = 500;
		animSpeed = 2;
		myCalc();
		$('#person').css('left', animUpdate);
	} else {
		$('#person').css('left', '75px');
	}
	
	if ( (distance <= walkingHeight) && (distance >= -(screenHeight)) ) {
		spriteSpeed = 100;
		spriteNum = 6;
		mySprite();
		if ( spriteUpdate == 0 ) {
			$('#person').removeClass().addClass('f0');
		} else if ( spriteUpdate == 1 ) {
			$('#person').removeClass().addClass('f1');
		} else if ( spriteUpdate == 2 ) {
			$('#person').removeClass().addClass('f2');
		} else if ( spriteUpdate == 3 ) {
			$('#person').removeClass().addClass('f3');
		} else if ( spriteUpdate == 4 ) {
			$('#person').removeClass().addClass('f4');
		} else if ( spriteUpdate == 5 ) {
			$('#person').removeClass().addClass('f5');
		}
	}

	
/*
	if ( (distance <= walkingHeight) && (distance >= -(screenHeight)) ) {
		spriteSpeed = 100;
		mySprite();
		console.log(spriteUpdate);
		if ( spriteUpdate == 0 ) {
			$('#person').css({backgroundPosition: 'right 0'});
		} else if ( spriteUpdate == 1 ) {
			$('#person').css({backgroundPosition: 'left -350px'});
		} else if ( spriteUpdate == 2 ) {
			$('#person').css({backgroundPosition: 'right -350px'});
		} else if ( spriteUpdate == 3 ) {
			$('#person').css({backgroundPosition: 'left -700px'});
		} else if ( spriteUpdate == 4 ) {
			$('#person').css({backgroundPosition: 'right -700px'});
		} else if ( spriteUpdate == 5 ) {
			$('#person').css({backgroundPosition: 'left 0'});
		}
	}
*/

console.log(spriteUpdate);

});

</script>

</body>
</html>