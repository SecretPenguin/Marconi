(function($) {
	// returns a random integer between `from` and `to`
	function randomFromTo(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

  var social = new Scene("social", 400);

  social.init = function() {
  	this.chatRounds = [
				[0, 1, 2],
				[3, 4, 5, 6],
				[7, 8, 9, 10]
		];
    this.runOnce = true;
  	this.$chat = $("#chat-container");
  	this.$conversation = $("#theConversation");
  	this.$form = $("#usersInput");
  	this.$typing = $("#usersTyping");
  	this.userSentences = this.$conversation
  		.find(".userText > p.theText")
	  	.map(function() { return $(this).text(); });

	  this.initTypeJack();

  	this.$typing.on("keydown", $.proxy(this.typeJack.addText, this.typeJack));
  	this.$form.on("submit", $.proxy(this.onSubmit, this));
  };

  social.initTypeJack = function() {
  	var $typing = this.$typing;

  	this.typeJack = {
			text: this.userSentences[0],
			index: 0, // current cursor position
			keysPer: 2, // how many letters to type per key press
			addText: function(key) {
				if (this.text) { // otherway if text is loaded
					if (key.keyCode == 13) { // on enter
						$("#usersInput").submit();
					} else if (key.keyCode == 9) { // on tab
						// no op
					} else if (key.keyCode != 8){ // anything but backspace
						this.index += this.keysPer; // advance index
					} else { // backspace
						if (this.index > 0) {
							this.index -= this.keysPer;//	retreat index
						}
					}

					$typing.val(this.text.substring(0, this.index));
				}

				if (key.preventDefault && key.keyCode != 122) {
					// prevent F11(fullscreen) from being blocked
					key.preventDefault()
				}

				if (key.keyCode != 122) { // otherway prevent keys default behavior
					key.returnValue = false;
			  }
			}
		}
  };

  social.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
    this.$chat.height(M.screenHeight - 320);
    this.$conversation.scrollTop(this.$conversation[0].scrollHeight);
  };

  social.onScroll = function(event) {
    this.conditionallyFixateScene();

		if (this.distance >= -M.screenHeight - this.distance && this.runOnce ) {
	    this.showChatRound(0);
	    this.runOnce = false;
		}
  };

  social.onSubmit = function(event) {
  	event.preventDefault();

  	// Clear the typing area
  	$("#usersTyping").val("");

  	// This tells us how many of the users texts are visible (which means they have happened)
  	var hasHappened = $(".userText:visible").length;
  	var nextSentence = $(".userText:visible").length + 1;

  	// Set the next script for the user
  	this.typeJack.text = this.userSentences[nextSentence];
  	this.typeJack.index = 0;

  	// Make the next round happen
  	this.showChatRound(nextSentence);
  };

  social.showChatRound = function(round) {
  	var timeoutDuration = 0;
  	var $conversation = this.$conversation;

  	$.each(this.chatRounds[round], function(index, divIndex) {
  		// increase the timeoutDuration each round (except the first)
  		// so they occur serially
  		if (index !== 0) {
  			timeoutDuration += randomFromTo(800, 1200);
  		}

  		setTimeout(function() {
  			$conversation.find("> div").eq(divIndex).show();
  			// Scroll to bottom
  			$conversation.scrollTop($conversation[0].scrollHeight);
  		}, timeoutDuration);
  	});
  };

 	this.scene = social;
  this.M.register(social);
})(jQuery);
