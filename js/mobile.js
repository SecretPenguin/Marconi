(function($) {
  var mobile = new Scene("mobile", 400);

  mobile.init = function() {
    this.$switchButtons = $("#switchboard a");
    this.$devicesContainer = $("#devices");
    this.$devices = this.$devicesContainer.find("div");
    this.$bgImages = $("#fullScreen div");

    this.$switchButtons.on("click", $.proxy(this.selectDevice, this));
  };

  mobile.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
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
