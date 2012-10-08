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

  // my share bar, if I have one
  Scene.prototype.shareBar = function() {
    if (this._shareBar) {
      return this._shareBar;
    }

    var $share = this.$container.next(".share");

    if ($share.length) {
      this._shareBar = new ShareBar($share, this);
    } else {
      this._shareBar = null;
    }

    return this._shareBar;
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
  Scene.prototype.conditionallyFixateScene = function(distance) {
    if (distance < 0) {
      this.$screen.attr("class", "stickTop");
    } else if (distance < this.sceneLength) {
      this.$screen.attr("class", "fixTop");
    } else {
      this.$screen.attr("class", "stickBot");
    }
  };

  // calculate offset of elements for updating the position of elements on scroll
  Scene.prototype.calculateOffset = function(origin, trigger, speed) {
    // animOrigin = Element offset
    // animTrigger = Position of variable "distance" when animation begins
    // animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
    return (this.distance - trigger)/speed + origin;
  }

  this.Scene = Scene;
})();
