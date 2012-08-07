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
		<p id="t1" class="tagline">A tagline begins and displays related animations...</p>
		<p id="t2" class="tagline">... and is expanded upon with more relevant animations ...</p>
		<p id="t3" class="tagline">... and concludes with victorious animations!</p>
		<div id="person"></div>
		<div id="person2"></div>
		<div id="wall"></div>
		<div id="projectile"></div>
		<div id="play"><p><a class="scroll" href="#End">Play</a></p></div>
	</div>
</div>
<div id="End"></div>
<div class="space"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="jquery.backgroundpos.min.js"></script>
<script>

var sceneHeight = 5000;
var scrollSpeed = 10000; // Base speed
var setSpeed = 2; // Scroll speed per pixel

$('#screen').height($(window).height());
var screenHeight = $('#screen').height();
$('#walking').height(screenHeight + sceneHeight);
var walkingHeight = $('#walking').height();
var difHeight = (walkingHeight - screenHeight);
// var totalHeight = (walkingHeight + screenHeight);


$(window).resize(function() {
	$('#screen').height($(window).height());
	var screenHeight = $('#screen').height();
	$('#walking').height(screenHeight + sceneHeight);
	var walkingHeight = $('#walking').height();
	var difHeight = (walkingHeight - screenHeight);
	// var totalHeight = (walkingHeight + screenHeight);
});

$(window).on('scroll', function () {
	var scrollTop = $(window).scrollTop();
	walkingOffset = $('#walking').offset().top;
	distance = -(walkingOffset - scrollTop);
	
	// Update play speed based on distance from end
	scrollSpeed = (walkingHeight - distance)*setSpeed;
	
	// Keep scene still during scroll
	if ( (distance < 0) ) {
		$('#screen').removeClass().addClass('stickTop');
	} else if ( distance >= difHeight ) {
		$('#screen').removeClass().addClass('stickBot');
	} else if ( (distance >= 0) && (distance < difHeight) ) {
		$('#screen').removeClass().addClass('fixTop');
	}
	
	var animUpdate; // Used only for console.log
	function myCalc(animOrigin, animTrigger, animSpeed) {
		// animOrigin = Element offset
		// animTrigger = Position of variable "distance" when animation begins
		// animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
		animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
	}
	
	var spriteUpdate = 0;
	function mySprite(spriteSpeed, spriteNum) {
		// spriteSpeed = Pixels scrolled between sprite triggers
		// spriteNum = Number of sprites in animation
		spriteUpdate = Math.abs((Math.ceil(distance/spriteSpeed))%spriteNum);
	}
	
	// Projectile Test
	if ( distance >= 1000 ) {
		myCalc(-50,1000,2);
		$('#projectile').css('right', animUpdate);
	} else {
		$('#projectile').css('right', '-50px');
	}
	
	// Walking Sprite Update
	if ( (distance <= walkingHeight) && (distance >= -(screenHeight)) ) {
		mySprite(100,6);
		if ( spriteUpdate == 0 ) {
			$('#person, #person2').removeClass().addClass('f0');
		} else if ( spriteUpdate == 1 ) {
			$('#person, #person2').removeClass().addClass('f1');
		} else if ( spriteUpdate == 2 ) {
			$('#person, #person2').removeClass().addClass('f2');
		} else if ( spriteUpdate == 3 ) {
			$('#person, #person2').removeClass().addClass('f3');
		} else if ( spriteUpdate == 4 ) {
			$('#person, #person2').removeClass().addClass('f4');
		} else if ( spriteUpdate == 5 ) {
			$('#person, #person2').removeClass().addClass('f5');
		}
	}
	
	// Walking Right Test
	if ( distance >= 1000 ) {
		myCalc(75,1000,2);
		$('#person').css('left', animUpdate);
	} else {
		$('#person').css('left', '75px');
	}
	
	// Walking Left Test
	if ( distance >= 3000 ) {
		myCalc(-1075,1000,2);
		$('#person2').css('right', animUpdate);
	} else {
		$('#person2').css('right', '-75px');
	}
	
	// Taglines
	if ( distance >= 4000 ) {
		$('#t3').fadeIn();
		$('#t2, #t1').hide();
	} else if ( (distance >= 3800) && (distance < 4000) ) {
		$('#t2, #t3').fadeOut();
		$('#t1').hide();
	} else if ( (distance >= 2000) && (distance < 3800) ) {
		$('#t2').fadeIn();
		$('#t1, #t3').fadeOut();
	} else if ( (distance >= 1800) && (distance < 2000) ) {
		$('#t1, #t2').fadeOut();
	} else {
		$('#t1').fadeIn();
	}
	
/* Used in place of setting classes - requires backgroundPosition Plugin
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

console.log(distance);

});


// Auto Play
$('.scroll').click(function(event){
	event.preventDefault();
	var full_url = this.href;
	//split the url by # and get the anchor target name
	var parts = full_url.split("#");
	var trgt = parts[1];
	//get the top offset of the target anchor
	var target_offset = $("#"+trgt).offset();
	var target_top = target_offset.top;
	//goto that anchor by setting the body scroll top to anchor top
	// Set scrollSpeed by setting setSpeed
	$('html, body').stop().animate({scrollTop:target_top}, scrollSpeed, 'linear');

	// Stop animation on scroll
	$('body, html').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
		if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
			$("html,body").stop().unbind();
		}
	});
});



</script>

</body>
</html>