(function($) {
  var mobile = {
    init: function() {
      this.scrollBuffer = 400; // fit the scene to the screen
      this.$mobile = $("#mobile");
      this.$screen = $("#mobile-screen");
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
    },

    onResize: function(event) {
      this.sceneHeight = M.screenHeight + this.scrollBuffer;
      this.$screen.height(M.screenHeight);
      this.$mobile.height(this.sceneHeight);
    },

    onScroll: function(event) {
      var scrollTop = $(window).scrollTop();
      var mobileOffset = this.$mobile.offset().top;
      var distance = -(mobileOffset - scrollTop);

      // Keep scene still during scroll
      if (distance < 0) {
        this.$screen.attr("class", "stickTop");
      } else if (distance >= this.scrollBuffer) {
        this.$screen.attr("class", "stickBot");
      } else if (distance >= 0 && distance < this.sceneHeight) {
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
    },
    selectDevice: function(event) {
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
    },

    activateSlider: function(deviceId) {
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
    }
  };

  this.M.register(mobile);

})(jQuery);
