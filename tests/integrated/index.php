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
		<div id="cogShift">
			<div id="cog1" class="cogS norm"></div>
			<div id="cog2" class="cogM rev"></div>
			<div id="cog3" class="cogL norm"></div>
			<div id="cog4" class="cogXL rev"></div>
			<div id="cog5" class="cogS norm"></div>
			<div id="cog6" class="cogM rev"></div>
			<div id="cog7" class="cogL norm"></div>
			<div id="cog8" class="cogXL rev"></div>
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

var sceneHeight = 12000;
var scrollSpeed = 10000; /* Base speed */
var setSpeed = 2; /* Scroll speed per pixel */

$('#screen').height($(window).height());
var screenHeight = $('#screen').height();

$(window).resize(function() {
	$('#screen').height($(window).height());
	var screenHeight = $('#screen').height();
});

$(window).on('scroll', function () {
	var scrollTop = $(window).scrollTop(),
	cogsOffset = $('#cogs').offset().top,
	distance = -(cogsOffset - scrollTop);
	
	/* Update play speed based on distance from end */
	scrollSpeed = (sceneHeight - distance)*setSpeed;
	
	/* Keep scene still during scroll */
	if ( (distance < 0) ) {
		$('#screen').removeClass().addClass('stickTop');
	} else if ( distance >= sceneHeight ) {
		$('#screen').removeClass().addClass('stickBot');
	} else if ( (distance >= 0) && (distance < sceneHeight) ) {
		$('#screen').removeClass().addClass('fixTop');
	}
	
	var animOrigin = 0; /* Element offset */
	var animTrigger = 1;
	var animSpeed = 2; /* Default Speed updates number at 1/2 rate of pixels scroll - keep full pixel movement to trigger sprites */
	var animUpdate;
	function myCalc() {
		animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
	}
	
	/* Rotation */
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
	
	/* Cog Scroll */
	var cogScroll = -distance/3;
	if ( (distance >= 0) && (distance <= sceneHeight) ) {
		$('#cogShift').css('top', cogScroll);
	}
	
	/* Cogs Shift Test */
	if ( (distance >= 1500) && (distance < 4000) ) {
		animOrigin = 0;
		animTrigger = 1500;
		animSpeed = 30;
		myCalc();
		$('#cogShift').css('left', animUpdate);
	} else if ( (distance >= 5000) && (distance <= 9500) ) {
		animOrigin = 84; /* Previous animations end position */
		animTrigger = 5000;
		animSpeed = 25;
		myCalc();
		var animUpdateTurn = -(animUpdate - 2*animOrigin); /* Very crappy way of switching movement of animation */
		$('#cogShift').css('left', animUpdateTurn);
	}
	
	/* Taglines */
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
	
console.log(distance);

});

/* Auto Play */
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
	$('html, body').stop().animate({scrollTop:target_top}, scrollSpeed);

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