(function($) {
  var social = new Scene("social", 400);

  social.init = function() {
    this.chatStarted = false;
    this.textIndex = 0;
    this.keysPer = 2;
  	this.$chatContainer = $("#chat-container");
  	this.$chat = $("#the-chat");
  	this.$form = this.$container.find("form");
  	this.$textarea = this.$form.find("textarea");

  	this.activateUserMessage($("#user-message-one"));

  	this.$textarea.on("keydown", $.proxy(this.typeJack, this));
  	this.$form.on("submit", $.proxy(this.onSubmit, this));
  };

  social.activateUserMessage = function(message) {
  	this.textIndex = 0;
  	this.userMessage = message;
  	this.userText = message.find(".message").text();
  };

  social.typeJack = function(event) {
  	var key = event.keyCode;

  	if (key === 9) { // tab is a pass through
  		return true;
  	}

  	event.preventDefault();

  	if (this.userText) {
  		if (key === 13) { // enter
  			this.$form.submit();
  		} else if (key === 8) { // backspace
  			if (this.textIndex > 0) {
  				this.textIndex -= this.keysPer;
  			}
  		} else {
  			this.textIndex += this.keysPer;
  		}

  		this.$textarea.val(this.userText.substring(0, this.textIndex));
  	}
  };

  social.scrollChatToBottom = function() {
  	this.$chat.scrollTop(this.$chat[0].scrollHeight);
  };

  social.onResize = function() {
    this.$container.height(M.screenHeight + this.sceneLength);
    this.$chatContainer.height(M.screenHeight - 407);
    this.scrollChatToBottom();
  };

  social.onScroll = function(event) {
    this.conditionallyFixateScene();

    if (!this.chatStarted && this.isFixated()) {
    	this.chatStarted = true;
    	// wait half a second and then show first message to kick off scene
    	setTimeout($.proxy(this.showFirstMessage, this), 500);
    }
  };

  social.onSubmit = function(event) {
  	event.preventDefault();
  	this.$textarea.val("");
  	this.showMessage(this.userMessage);
  	this.showRepliesToMessage(this.userMessage);
  	this.activateUserMessage($(".user-message:hidden:first"));
  };

  social.showFirstMessage = function() {
  	var first = $("#first-message");
  	this.showMessage(first);
  };

  social.showRepliesToMessage = function($message) {
  	var messageId = $($message).attr("id");
  	var replies = $("div.reply-to-" + messageId);
  	var self = this;
  	var i = 0;

  	var interval = setInterval(function() {
  		self.showMessage(replies[i]);

  		if (++i >= replies.length) {
  			clearInterval(interval);
  		}
  	}, 1200);
  };

  social.showMessage = function($message) {
  	$message = $($message);

  	if ($message.is(":hidden")) {
  		$message.show();
  		this.scrollChatToBottom();
  	}
  };

  this.M.register(social);
})(jQuery);
