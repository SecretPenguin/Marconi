(function($) {
  var social = new Scene("social", 400);

  social.init = function() {
    this.runOnce = true;
  	this.$chat = $('#chat-container');
  	this.$conversation = $("#theConversation");
    
    $(window).on("scroll", $.proxy(this.onScroll, this));
    
  };

  social.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
    this.$chat.height(M.screenHeight - 320);
    this.$conversation.scrollTop(this.$conversation[0].scrollHeight);
  };

  social.onScroll = function(event) {
    var distance = this.distance();

    this.conditionallyFixateScene(distance);
  
	if ( distance >= -M.screenHeight - distance && this.runOnce ) {
      this.startChat(0);
      this.runOnce = false;
	}

    console.log(distance);
  };

  social.startChat = function(roundNumber) {
		// This function emulates PHPs rand() function. It is used in the chatRound() function.
		function randomFromTo(from, to){
			return Math.floor(Math.random() * (to - from + 1) + from);
		}
		
		// Chat Rounds
		function chatRound(roundNumber) {
		
		// Each round gets a comma seperated list of the conversation <div>s that need to show up during that round
		var rounds = new Array();
		rounds[0] = new Array(0,1,2);
		rounds[1] = new Array(3,4,5,6);
		rounds[2]= new Array(7,8,9,10);
		
		// Random number to add to each additional element so they all happen after each other
		var baseRandom = randomFromTo(8,14)*100;
		i = 0;
		
		// NEXT STEP... Make a four each that replicates the below set-timeout loop things in a more random and less verbose way
		$.each(rounds[roundNumber], function() {
			var elementNumber = this;
			// Add some more time to each so they happen after each other - make the first one happen instantly
			if (i == 0) {
				baseRandom = 0;
			} else {
				baseRandom = baseRandom+(randomFromTo(8,12)*100);
			}
			setTimeout(function() {
				$('#theConversation > div').eq(elementNumber).show();
				// Scroll to bottom
				this.$conversation.scrollTop(this.$conversation[0].scrollHeight);
				}, baseRandom);
				i++;
			});
		}
		
		// chatRound(0); Moved to onScroll function
		
		$('#usersInput').submit(function() {
		
		// Clear the typing area
		$("#usersTyping").val('');
		
		// This tells us how many of the users texts are visible (which means they have happened)
		var hasHappened = $(".userText:visible").length;
		
		// Set the next script for the user
		TypeJack.init();
		TypeJack.text = userSentences[hasHappened+1];
		TypeJack.index = 0;	
		
		// Make the next round happen
		chatRound(hasHappened+1);	
		
		return false; // Prevent button from submitting
		
		});
		
		
		// Type hijacker
		
		// Create an array of all the text a user says in the order that they should say it
		var userSentences = new Array();
		
		$('#theConversation div.userText').each(function(index) {
			userSentences[index]=$(this).children('p.theText').text();
		});
		
		
		// Start the key jacking on page load
		$('#usersTyping').keydown(
			function ( event ) { 
			TypeJack.addText( event ); //Capture the keydown event and call the addText
			}
		);
		
		
		var TypeJack={
			text: userSentences[0],
			accessCountimer:null,
			keysPer:2, // how many letters to type per key press
			index:0, // current cursor position
			init: function(){// inizialize 
		},
		
		content:function(){
			return $("#usersTyping").val();// get console content
		},
		
		addText:function(key){//Main function to add the code
			if(TypeJack.text){ // otherway if text is loaded
				var cont=TypeJack.content(); // get the console content
				if (key.keyCode==13) { // if user clicks ENTER
					$('#usersInput').submit(); // submit the form 
				} else if(key.keyCode==9) { // if user clicks TAB
					// this should tab to the next element
				} else if (key.keyCode!=8){ // if key is not backspace (this is the default behavior)
					TypeJack.index+=TypeJack.keysPer;	// add to the index the keysPer
				} else { // This is the backspace
					if(TypeJack.index>0) // else if index is not less than 0 
					TypeJack.index-=TypeJack.keysPer;//	remove keysPer for deleting text
				}
				$("#usersTyping").val(TypeJack.text.substring(0,TypeJack.index));// replace newline chars with br, tabs with 4 space and blanks with an html blank
			}
		
			if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
				key.preventDefault()
			};  
			if(key.keyCode != 122){ // otherway prevent keys default behavior
				key.returnValue = false;
		  }
			}
		}

	// Set the defaults and initiate

		TypeJack.init();
	};

  this.M.register(social);
})(jQuery);