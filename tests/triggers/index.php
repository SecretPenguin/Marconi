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

<div class="block" id="first"></div>
<div class="block" id="second"></div>
<div class="block" id="third"></div>
<div class="block" id="fourth"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>

$(window).scroll(function(){
	if ($(document).scrollTop() > 500) {
		$('#second').animate({opacity: 1}, 1000);
	}
	if ($(document).scrollTop() > 1100) {
		$('#third').animate({opacity: 1}, 1000);
	}
	if ( ($(document).scrollTop() > 1700) || ($(window).height() + $(window).scrollTop() == $(document).height()) ) {
		$('#fourth').animate({opacity: 1}, 1000);
	} 
});

</script>

</body>
</html>