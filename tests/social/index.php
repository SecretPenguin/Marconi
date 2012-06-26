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
	
	#usersTyping {
		width: 500px;
		height: 300px;
		
	}
	
</style>
</head>
<body>
	<h1>Social</h1>
	<ul id="theConversation">
		<li class="visible">User A: Does anybody know what the material means by "This and that and whatever else"?</li>
		<li>User B: Not sure, you could check the thing.</li>
		<li>User C: Yeah, check the thing.</li>
		<li class="userText">Real User: This text should match up exactly with the text from the file that generates the text that the user inputs.</li>
		<li>User C: Nice! Good call REAL USER.</li>
		<li>User B: Yeah, that sounds right.</li>
		<li>User A: Perfect, thanks REAL USER!</li>
		<li class="userText">Real User: The User Typed for a second time</li>
		<li class="userText">Real User: For a third time.</li>
		<li class="userText">Real User: 4th time.</li>
		<li class="userText">Real User: 5th time - maybe after this we start writing random weird stuff?</li>
	</ul>	
	<form id="usersInput">
		<textarea name="usersTyping" id="usersTyping"></textarea><br />
		<input type="submit" name="usersSubmit" />
	</form>
	
		
		
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>  
<script type="text/javascript">

// See if jQuery loaded from the Google repo. If not, load the local version
window.jQuery || document.write('<script src="js/jquery-1.7.2.min.js"><\/script>');


// Chat Rounds

function chatRound(roundNumber) {

	if (roundNumber == 0) {

		setTimeout(function() {
		
		    $('li').eq(1).show();
		
		    setTimeout(function() {
		    
		    	$('li').eq(2).show();
		    
		    }, 1000);
		
		}, 2000);
		    
	} else if (roundNumber == 1) {
	
		$('li').eq(3).show();
		
		setTimeout(function() {
		
			$('li').eq(4).show();
		
			setTimeout(function() {
			
				$('li').eq(5).show();
			
				setTimeout(function() {
			
					$('li').eq(6).show();
			
				}, 1000);
			
			
			}, 2000);
		
		}, 1500);
		
	
	} else if (roundNumber == 2) {
	
		$('li').eq(7).show();
		
		setTimeout(function() {
		
			$('li').eq(8).show();
		
			setTimeout(function() {
			
				$('li').eq(9).show();
			
				setTimeout(function() {
			
					$('li').eq(10).show();
			
				}, 1000);
			
			
			}, 2000);
		
		}, 1500);
		
	
	}
	
}

chatRound(0);

$('#usersInput').submit(function() {
	
	// Clear the typing area
	$("#usersTyping").val('');
	
	// This tells us how many of the users texts are visible (which means they have happened)
	var hasHappened = $(".userText:visible").length;
	
	// Set the next script for the user
	Typer.init();
	Typer.text = userSentences[hasHappened+1];
	Typer.index = 0;	
	
	// Make the next round happen
	chatRound(hasHappened+1);	
	
	return false; // Prevent button from submitting

});


// Type hijacker

// Create an array of all the text a user says in the order that they should say it
var userSentences = new Array();

$('#theConversation li.userText').each(function(index) {
	userSentences[index]=$(this).text();
});


// Start the key jacking on page load
$('#usersTyping').keydown(
    function ( event ) { 
    	Typer.addText( event ); //Capture the keydown event and call the addText, this is executed on page load
    }
);


var Typer={
	text: userSentences[0],
	accessCountimer:null,
	index:0, // current cursor position
	speed:2, // speed of the Typer
	init: function(){// inizialize 
	},
	
	content:function(){
		return $("#usersTyping").val();// get console content
	},
			
	addText:function(key){//Main function to add the code
		if(Typer.text){ // otherway if text is loaded
			var cont=Typer.content(); // get the console content
			if(key.keyCode!=8){ // if key is not backspace
				Typer.index+=Typer.speed;	// add to the index the speed
			}else{
				if(Typer.index>0) // else if index is not less than 0 
					Typer.index-=Typer.speed;//	remove speed for deleting text
			}
			$("#usersTyping").val(Typer.text.substring(0,Typer.index));// replace newline chars with br, tabs with 4 space and blanks with an html blank
			window.scrollBy(0,50); // scroll to make sure bottom is always visible
		}
		if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
			key.preventDefault()
		};  
		if(key.keyCode != 122){ // otherway prevent keys default behavior
			key.returnValue = false;
		}
	},

}

// Set the defaults and initiate

Typer.init();


</script>


	
</body>
</html>