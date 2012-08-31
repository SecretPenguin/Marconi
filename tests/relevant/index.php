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
<div id="cursprite"></div>
<div id="curposition"></div>
<div class="space"></div>

<div id="walking">
	<div id="screen">
		<div id="play"><p><a class="scroll" href="#End">Play</a></p></div>
		<div class="center">
			<div id="leftMask"></div>
			<div id="rightMask"></div>
			<p id="t1" class="tagline">A tagline begins and displays related animations...</p>
<!--
			<p id="t2" class="tagline">... and is expanded upon with more relevant animations ...</p>
			<p id="t3" class="tagline">... and concludes with victorious animations!</p>
-->
			<div id="person"></div>
<!-- 			<div id="person2"></div> -->
			<div id="wall"></div>
			<div id="projectile"></div>
			<div id="projectile2"></div>
			<div id="skillBox">
				<div id="explosion"></div>
				<div id="skill1"></div>
				<div id="skill2"></div>
			</div>
		</div>
	</div>
</div>
<div id="End"></div>
<div class="space"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="jquery.backgroundpos.min.js"></script>
<script>

var sceneHeight = 10000; // CSS height of #walking
var scrollSpeed = 20000; // Base speed
var setSpeed = 2; // Scroll speed per pixel

var $screen = $('#screen');
var $walking = $('#walking');

// Set screen height
$screen.height($(window).height());
var screenHeight = $screen.height();

// Set walking scene height
$walking.height(screenHeight + sceneHeight);
var walkingHeight = $walking.height();
var difHeight = (walkingHeight - screenHeight);
// var totalHeight = (walkingHeight + screenHeight);

// Update scene on window resize
$(window).resize(function() {
	$screen.height($(window).height());
	var screenHeight = $screen.height();
	$walking.height(screenHeight + sceneHeight);
	var walkingHeight = $walking.height();
	var difHeight = (walkingHeight - screenHeight);
	// var totalHeight = (walkingHeight + screenHeight);
});

$(window).on('scroll', function () {
	var scrollTop = $(window).scrollTop();
	walkingOffset = $walking.offset().top;
	distance = -(walkingOffset - scrollTop);
	
	// Update play speed based on distance from end
	scrollSpeed = (walkingHeight - distance)*setSpeed;
	
	// Keep scene still during scroll
	if ( (distance < 0) ) {
		$screen.removeClass().addClass('stickTop');
	} else if ( distance >= difHeight ) {
		$screen.removeClass().addClass('stickBot');
	} else if ( distance >= 0 && distance < difHeight ) {
		$screen.removeClass().addClass('fixTop');
	}
	
	
	// Move elements on scroll
	var animUpdate; // Used only for console.log
	function myCalc(animOrigin, animTrigger, animSpeed) {
		// animOrigin = Element offset
		// animTrigger = Position of variable "distance" when animation begins
		// animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
		animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
	}
	
	// Update sprites on scroll
	var spriteUpdate = 0;
	function mySprite(spriteSpeed, spriteNum) {
		// spriteSpeed = Pixels scrolled between sprite triggers
		// spriteNum = Number of sprites in animation
		spriteUpdate = Math.abs((Math.ceil(distance/spriteSpeed))%spriteNum);
	}
	
	// Explosion Function
	function explosionTrigger(startExplosion) {
		// startExplosion = Distance to trigger animation
		if (distance >= startExplosion && distance <= startExplosion + 50) {
			$('#explosion').attr('class', 'f0');
		} else if (distance > startExplosion + 50 && distance <= startExplosion + 100) {
			$('#explosion').attr('class', 'f1');
		} else if (distance > startExplosion + 100 && distance <= startExplosion + 150) {
			$('#explosion').attr('class', 'f2');
		} else if (distance > startExplosion + 150 && distance <= startExplosion + 200) {
			$('#explosion').attr('class', 'f3');
		} else if (distance > startExplosion + 200 && distance <= startExplosion + 250) {
			$('#explosion').attr('class', 'f4');
		} else {
			$('#explosion').attr('class', 'hidden');
		}
	}
	
	// Animations!
	
	// Projectile Test
	if ( distance >= 3160 ) {
		$('#projectile').css('right', '480px');
	} else if ( distance >= 1000 && distance < 3160 ) {
		myCalc(-550,1000,2);
		$('#projectile').css('right', animUpdate);
	} else {
		$('#projectile').css('right', '-550px');
	}
	
	// Projectile (2) Test
	if ( distance >= 6160 ) {
		$('#projectile2').css('right', '480px');
	} else if ( distance >= 4000 && distance < 6160 ) {
		myCalc(-550,4000,2);
		$('#projectile2').css('right', animUpdate);
	} else {
		$('#projectile2').css('right', '-550px');
	}
	
	// Skill Test
	if ( distance < 3000 ) {
		$('#skill1').css({'bottom': 0, 'opacity': 0});
	} else if ( distance >= 3000 && distance < 3140 ) {
		myCalc(0,3000,10);
		$('#skill1').css({'bottom': animUpdate, 'opacity': (animUpdate/14)});
	} else if ( distance >= 3140 && distance <= 3390 ) {
		$('#skill1').css({'bottom': '14px', 'opacity': 1});
	} else if ( distance > 3390 && distance <= 3530 ) {
		myCalc(0,3390,1);
		$('#skill1').css({'bottom': '14px', 'opacity': (1-(animUpdate/140))});
	} else {
		$('#skill1').css({'bottom': '14px', 'opacity': 0});
	}
	
	// Explosion Animation
/*
	if ( (distance >= 3140 && distance <= 3190) || (distance >= 6140 && distance <= 6190) ) {
		$('#explosion').removeClass().addClass('f0');
	} else if ( (distance > 3190 && distance <= 3240) || (distance > 6190 && distance <= 6240) ) {
		$('#explosion').removeClass().addClass('f1');
	} else if ( (distance > 3240 && distance <= 3290) || (distance > 6240 && distance <= 6290) ) {
		$('#explosion').removeClass().addClass('f2');
	} else if ( (distance > 3290 && distance <= 3340) || (distance > 6290 && distance <= 6340) ) {
		$('#explosion').removeClass().addClass('f3');
	} else if ( (distance > 3340 && distance <= 3390) || (distance > 6340 && distance <= 6390) ) {
		$('#explosion').removeClass().addClass('f4');
	} else {
		$('#explosion').removeClass().addClass('hidden');
	}
*/
	if ( distance < 6140 ) {
		explosionTrigger(3140);
	} else {
		explosionTrigger(6140);
	}
		
	// Skill (2) Test
	if ( distance < 6000 ) {
		$('#skill2').css({'bottom': 0, 'opacity': 0});
	} else if ( distance >= 6000 && distance < 6140 ) {
		myCalc(0,6000,10);
		$('#skill2').css({'bottom': animUpdate, 'opacity': (animUpdate/14)});
	} else if ( distance >= 6140 && distance <= 6390 ) {
		$('#skill2').css({'bottom': '14px', 'opacity': 1});
	} else if ( distance > 6390 && distance <= 6530 ) {
		myCalc(0,6390,1);
		$('#skill2').css({'bottom': '14px', 'opacity': (1-(animUpdate/140))});
	} else {
		$('#skill2').css({'bottom': '14px', 'opacity': 0});
	}
		
	// Walking Sprite Update at Negative Distance
	if ( distance <= 0 && distance >= -screenHeight ) {
		mySprite(100,6);
		if ( spriteUpdate == 0 ) {
			$('#person').attr('class', 'f0');
		} else if ( spriteUpdate == 1 ) {
			$('#person').attr('class', 'f5');
		} else if ( spriteUpdate == 2 ) {
			$('#person').attr('class', 'f4');
		} else if ( spriteUpdate == 3 ) {
			$('#person').attr('class', 'f3');
		} else if ( spriteUpdate == 4 ) {
			$('#person').attr('class', 'f2');
		} else if ( spriteUpdate == 5 ) {
			$('#person').attr('class', 'f1');
		}
	}
		
	// Walking Sprite Update
	if ( distance <= walkingHeight && distance > 0 ) {
		mySprite(100,6);
		if ( spriteUpdate == 0 ) {
			$('#person').attr('class', 'f0');
		} else if ( spriteUpdate == 1 ) {
			$('#person').attr('class', 'f1');
		} else if ( spriteUpdate == 2 ) {
			$('#person').attr('class', 'f2');
		} else if ( spriteUpdate == 3 ) {
			$('#person').attr('class', 'f3');
		} else if ( spriteUpdate == 4 ) {
			$('#person').attr('class', 'f4');
		} else if ( spriteUpdate == 5 ) {
			$('#person').attr('class', 'f5');
		}
	}
	
	// Walking Right Test
	if ( distance >= -650 && distance < 1460 ) {
		myCalc(-650,-650,2);
		$('#person').css('left', animUpdate);
	} else if ( distance >= 1460 && distance <= 9000 ) {
		$('#person').css('left', '405px');
	} else if ( distance > 9000 ) {
		myCalc(405,9000,2);
		$('#person').css('left', animUpdate);
	} else {
		$('#person').css('left', '-650px');
	}
	
	// Walking Left Test
/*
	if ( distance >= 3000 ) {
		myCalc(-1075,1000,2);
		$('#person2').css('right', animUpdate);
	} else {
		$('#person2').css('right', '-75px');
	}
*/
	
	// Taglines
	if ( distance >= 4000 ) {
		$('#t3').fadeIn();
		$('#t2, #t1').hide();
	} else if ( distance >= 3800 && distance < 4000 ) {
		$('#t2, #t3').fadeOut();
		$('#t1').hide();
	} else if ( distance >= 2000 && distance < 3800 ) {
		$('#t2').fadeIn();
		$('#t1, #t3').fadeOut();
	} else if ( distance >= 1800 && distance < 2000 ) {
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
// Dev overlay
$('#cursprite').html(spriteUpdate);
$('#curposition').html(distance);

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