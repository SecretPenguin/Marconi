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

  Scene.prototype.onResize = function(event) {
  };

  Scene.prototype.onScroll = function(event) {
  };

  this.Scene = Scene;
})();
