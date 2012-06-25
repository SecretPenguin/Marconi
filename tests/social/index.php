<html>
<head>
<title>Social Scene Tests</title>
<style type="text/css">
	ul#theConversation li {
		display: none;
	}
	
	ul#theConversation li.visible {
		display: block;
	}
	
</style>
</head>
<body>
	<h1>Social</h1>
	<ul id="theConversation">
		<li class="visible">User A: Does anybody know what the material means by "This and that and whatever else"?</li>
		<li>User B: Not sure, you could check the thing.</li>
		<li>User C: Yeah, check the thing.</li>
		<li>Real User: Text that was auto generated no matter what keys the user hits.</li>
		<li>User C: Nice! Good call REAL USER.</li>
		<li>User B: Yeah, that sounds right.</li>
		<li>User A: Perfect, thanks REAL USER!</li>
	</ul>	
	<form id="usersInput">
		<input type="text" name="usersTyping" />
		<input type="submit" name="usersSubmit" />
	</form>
	



<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>  
<script type="text/javascript">

// See if jQuery loaded from the Google repo. If not, load the local version
window.jQuery || document.write('<script src="js/jquery-1.7.2.min.js"><\/script>');


setTimeout(function() {

	$('li').eq(1).show();

	setTimeout(function() {
	
		$('li').eq(2).show();
	
	}, 1000);


}, 3000);


$('#usersInput').submit(function() {

	$('li').eq(3).show();
	
	
	setTimeout(function() {
	
		$('li').eq(4).show();
	
		setTimeout(function() {
		
			$('li').eq(5).show();
		
			setTimeout(function() {
		
				$('li').eq(6).show();
		
			}, 1000);
		
		
		}, 3000);
	
	
	}, 2000);

	return false;
});
</script>

	
</body>
</html>