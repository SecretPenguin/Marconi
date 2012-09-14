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

  Scene.prototype.offset = function() {
    return this.$container.offset().top;
  };

  Scene.prototype.onResize = function(event) {
  };

  Scene.prototype.onScroll = function(event) {
  };

  this.Scene = Scene;
})();
