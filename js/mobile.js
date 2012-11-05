(function($) {
  var mobile = new Scene("mobile", 400);

  mobile.init = function() {
    this.$switchButtons = $("#switchboard a");
    this.$devicesContainer = $("#devices");
    this.$devices = this.$devicesContainer.find("div");
    this.$bgImages = $("#fullScreen div");
    this.$tagline = $("#mobile h2");
    
    $("#phoneBG").backstretch("/images/mobile/phone-bg.jpg");
    $("#tabletBG").backstretch("/images/mobile/beach-flip.jpg");
    $("#desktopBG").backstretch("/images/mobile/beach.jpg");

    this.$switchButtons.on("click", $.proxy(this.selectDevice, this));
  };

  mobile.onScroll = function(event) {
    this.conditionallyFixateScene();

    // Animate current device in when approaching scene
    var deviceSpeed = (this.distance / 2) + 146;

    if (this.distance < -292) {
      this.$devicesContainer.css("bottom", 0);
    } else if (this.distance >= -292 && this.distance < 0) {
      this.$devicesContainer.css("bottom", deviceSpeed);
    } else if (this.distance >= 0) {
      this.$devicesContainer.css("bottom", 146);
    }
    
    var newOffset;
    if (this.distance < -500) {
      this.$tagline.css("top", 30);
    } else if (this.distance >= -500 && this.distance < 0) {
      newOffset = this.calculateOffset(0, -500, 10);
      this.$tagline.css("top", (30 + newOffset));
    } else if (this.distance > 0) {
      this.$tagline.css("top", 80);
    }
  };

  mobile.selectDevice = function(event) {
    var $clicked = $(event.target);
    var thisEQ = $clicked.index();
    var $selected = this.$devices.eq(thisEQ);

    this.$switchButtons.removeClass("current");
    $clicked.addClass("current");

    this.$devices.stop().css("z-index", 0).animate({top: 231}, 500, function() {
      $selected.stop().css("z-index", 10).animate({top: 0}, 500);
    });
    this.$bgImages.stop().animate({opacity: 0}, 800);
	this.$bgImages.eq(thisEQ).stop().animate({opacity: 1}, 800);
  };

  this.M.register(mobile);
})(jQuery);
