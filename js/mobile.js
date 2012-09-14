(function($) {
  var mobile = new Scene("mobile", 400);

  mobile.init = function() {
    this.$switchButtons = $("#switchboard a");
    this.$devicesContainer = $("#devices");
    this.$devices = this.$devicesContainer.find("div");
    this.$slidersContainer = $("#sliders");
    this.$phoneSlider = $("#phoneSlider").remove();
    this.$tabletSlider = $("#tabletSlider").remove();
    this.$desktopSlider = $("#desktopSlider").remove();

    $(window).on("scroll", $.proxy(this.onScroll, this));
    this.$switchButtons.on("click", $.proxy(this.selectDevice, this));

    this.activateSlider("phone");
  };

  mobile.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
  };

  mobile.onScroll = function(event) {
    var scrollTop = $(window).scrollTop();
    var mobileOffset = this.$container.offset().top;
    var distance = -(mobileOffset - scrollTop);

    // Keep scene still during scroll
    if (distance < 0) {
      this.$screen.attr("class", "stickTop");
    } else if (distance >= this.sceneLength) {
      this.$screen.attr("class", "stickBot");
    } else if (distance >= 0 && distance < this.sceneLength) {
      this.$screen.attr("class", "fixTop");
    }

    // Animate current device in when approaching scene
    var deviceSpeed = (distance / 2) + 146;
    if (distance < -292) {
      this.$devicesContainer.css("bottom", 0);
    } else if ( distance >= -292 && distance < 0 ) {
      this.$devicesContainer.css("bottom", deviceSpeed);
    } else if (distance >= 0) {
      this.$devicesContainer.css("bottom", 146);
    }

    console.log(distance);
  };

  mobile.selectDevice = function(event) {
    var $clicked = $(event.target);
    var thisEQ = $clicked.index();
    var $selected = this.$devices.eq(thisEQ);
    var selectedId = $selected.attr("id");

    this.$switchButtons.removeClass("current");
    $clicked.addClass("current");

    this.$devices.stop().css("z-index", 0).animate({top: 231}, 500, function() {
      $selected.stop().css("z-index", 10).animate({top: 0}, 500);
    });

    this.activateSlider(selectedId);
  };

  mobile.activateSlider = function(deviceId) {
    var slider = this["$"+deviceId+"Slider"].clone();
    this.$slidersContainer.animate({opacity: 0}, 800);
    this.$slidersContainer.html(slider);
    this.$slidersContainer.find("div").maximage({
      cycleOptions: {
        fx: "fade",
        speed: 800,
        timeout: 1000
      },
      cssBackgroundSize: false,
      cssTransitions: false
    });
    this.$slidersContainer.animate({opacity: 1}, 800);
  };

  this.M.register(mobile);
})(jQuery);
