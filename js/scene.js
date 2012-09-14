(function() {
  function Scene(containerId, sceneLength, options) {
    var settings = $.extend({}, {
      scrollSpeed: 10000,
      setSpeed: 2
    }, options);

    var self = this;

    $.each(settings, function(key, value) {
      self[key] = value;
    });

    this.containerId = containerId;
    this.sceneLength = sceneLength;
    this.$container = $("#" + containerId);
    this.$screen = $("#" + containerId + "-screen");
  };

  Scene.prototype.init = function() {
  };

  // how far I am from the top of the page
  Scene.prototype.offset = function() {
    return this.$container.offset().top;
  };

  // how far I am from the top of the viewport
  Scene.prototype.distance = function() {
    return -(this.offset() - $(window).scrollTop());
  }

  Scene.prototype.setScrollSpeed = function(distance) {
    this.scrollSpeed = (this.sceneLength - distance) * this.setSpeed;
  };

  Scene.prototype.onResize = function(event) {
  };

  Scene.prototype.onScroll = function(event) {
  };

  // this is not a great function name
  Scene.prototype.condtionallyFixateScene = function(distance) {
    if (distance < 0) {
      this.$screen.attr("class", "stickTop");
    } else if (distance < this.sceneLength) {
      this.$screen.attr("class", "fixTop");
    } else {
      this.$screen.attr("class", "stickBot");
    }
  };

  this.Scene = Scene;
})();
