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

<div id="cogs">
	<div id="screen">
		<div id="play"><p><a class="scroll" href="#End">Play</a></p></div>
		<div id="cogTagline">
			<h2>Integrated Tagline</h2>
			<div id="hideLeft"></div>
			<div id="hideRight"></div>
			<div id="cogLeft" class="cogS norm"></div>
			<div id="cogRight" class="cogM rev"></div>
		</div>
		<div id="cogShift">
			<div id="cog1d" class="cogS norm back"></div>
			<div id="cog1" class="cogS norm"></div>
			<div id="cog2d" class="cogM rev back"></div>
			<div id="cog2" class="cogM rev"></div>
			<div id="cog3d" class="cogL norm back"></div>
			<div id="cog3" class="cogL norm"></div>
			<div id="cog4d" class="cogXL rev back"></div>
			<div id="cog4" class="cogXL rev"></div>
			<div id="cog5" class="cogS norm"></div>
			<div id="cog6" class="cogM rev"></div>
			<div id="cog7" class="cogL norm"></div>
			<div id="cog8" class="cogXL rev"></div>
			<div id="cog8mask"></div>
			<div id="cog9" class="cogS norm"></div>
			<div id="cog10" class="cogM rev"></div>
			<div id="cog11" class="cogL norm"></div>
			<div id="cog12" class="cogXL rev"></div>
			<div id="cog13" class="cogS norm"></div>
			<div id="cog14" class="cogM rev"></div>
			<div id="cog15" class="cogL norm"></div>
			<div id="cog16" class="cogXL rev"></div>
		</div>
	</div>
</div>
<div id="End"></div>
<div class="space">
	<div class="center">Test</div>
</div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="jQueryRotate.2.2.js"></script>
<script>

var sceneHeight = 18000;
var scrollSpeed = 10000; // Base speed
var setSpeed = 2; // Scroll speed per pixel

$('#screen').height($(window).height());
var screenHeight = $('#screen').height();

$(window).resize(function() {
	$('#screen').height($(window).height());
	var screenHeight = $('#screen').height();
});

$(window).on('scroll', function () {
	var scrollTop = $(window).scrollTop();
	cogsOffset = $('#cogs').offset().top;
	distance = -(cogsOffset - scrollTop);
	
	// Update play speed based on distance from end
	scrollSpeed = (sceneHeight - distance)*setSpeed;
	
	// Keep scene still during scroll
	if ( (distance < 0) ) {
		$('#screen').removeClass().addClass('stickTop');
	} else if ( distance >= sceneHeight ) {
		$('#screen').removeClass().addClass('stickBot');
	} else if ( (distance >= 0) && (distance < sceneHeight) ) {
		$('#screen').removeClass().addClass('fixTop');
	}
	
	var animUpdate; // Used only for console.log
	function myCalc(animOrigin, animTrigger, animSpeed) {
		// animOrigin = Element offset
		// animTrigger = Position of variable "distance" when animation begins
		// animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
		animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
	}
	
	// Rotation
	var rotateSpeedS = distance/2;
	var rotateSpeedM = distance/4;
	var rotateSpeedL = distance/6;
	var rotateSpeedXL = distance/8;
	if ( distance >= -(screenHeight) && (distance <= sceneHeight) ) {
		$('.cogS.rev').rotate(- rotateSpeedS);
		$('.cogS.norm').rotate(rotateSpeedS);
		$('.cogM.rev').rotate(- rotateSpeedM);
		$('.cogM.norm').rotate(rotateSpeedM);
		$('.cogL.rev').rotate(- rotateSpeedL);
		$('.cogL.norm').rotate(rotateSpeedL);
		$('.cogXL.rev').rotate(- rotateSpeedXL);
		$('.cogXL.norm').rotate(rotateSpeedXL);
	}
	
	// Cog Scroll
	var cogScroll = -distance/3;
	if ( (distance >= 0) && (distance <= sceneHeight) ) {
		$('#cogShift').css('top', cogScroll);
	}
	
	// Cogs Shift Test
	if ( (distance >= 5500) && (distance < 8000) ) {
		myCalc(0,5500,30);
		$('#cogShift').css('left', animUpdate);
	} else if ( (distance >= 9000) && (distance <= 13500) ) {
		myCalc(84,9000,25);
		var animUpdateTurn = -(animUpdate - 2*84); // Very crappy way of switching movement of animation
		$('#cogShift').css('left', animUpdateTurn);
	}
	
	// Cog Depth
	$('.back').each(function() {
		$back = $(this);
		backTop = parseInt($back.css('top'));
		cogHeight = $back.height();
		percentShift = (backTop + cogScroll + cogHeight/2)/screenHeight;
		updateMargin = -16*percentShift;
		if ((percentShift >= 0) && (percentShift <=1)) {
			$back.css('margin-top', updateMargin);
		} else if (percentShift < 0) {
			$back.css('margin-top', 0);
		}
	});
	
	// Taglines
	if ( distance < 500 ) {
		$('#cogLeft').css('margin-left', '-440px');
		$('#cogRight').css('margin-right', '-590px');
		$('#hideLeft').css('margin-left', '-525px');
		$('#hideRight').css('margin-right', '-525px');
	} else if ( (distance >= 500) && (distance <= 1540) ) {
		myCalc(0,500,4);
		$('#cogLeft').css('margin-left', (-440 + animUpdate));
		$('#cogRight').css('margin-right', (-590 + animUpdate ));
		$('#hideLeft').css('margin-left', (-525 + animUpdate));
		$('#hideRight').css('margin-right', (-525 + animUpdate));
	} else if ( (distance > 1540) && (distance <= sceneHeight) ) {
		myCalc(0,1540,5);
		$('#cogTagline').css('margin-top', -animUpdate);
		$('#cogLeft').css('margin-left', '-180px');
		$('#cogRight').css('margin-right', '-330px');
	}
	
console.log(percentShift);

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