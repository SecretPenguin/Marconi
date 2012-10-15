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
    this.active = false;
    this.initAutoPlay();
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

  Scene.prototype.calculateTopAndDistance = function() {
    this.top = this.$container.offset().top;
    this.bottom = this.top + this.sceneLength;
    this.distance = -(this.top - M.screenTop);
  };

  Scene.prototype.calculateScrollSpeed = function() {
    this.scrollSpeed = (this.sceneLength - this.distance) * this.setSpeed;
  };

  Scene.prototype.onResize = function(event) {
  };

  // any calculations that all scenes need in their onScroll functions are done
  // here.
  Scene.prototype.beforeScroll = function() {
    this.calculateTopAndDistance();
  };

  Scene.prototype.onScroll = function(event) {
  };

  Scene.prototype.afterScroll = function(event) {
    // console.log(this.distance);
    $("#curposition").html(this.distance);
  };

  // this is not a great function name
  Scene.prototype.conditionallyFixateScene = function() {
    if (this.distance < 0) {
      this.$screen.attr("class", "stickTop");
    } else if (this.distance < this.sceneLength) {
      this.$screen.attr("class", "fixTop");
    } else {
      this.$screen.attr("class", "stickBot");
    }
  };

  Scene.prototype.isFixated = function() {
    return this.$screen.hasClass("fixTop");
  };

  Scene.prototype.unFixateScene = function() {
    this.$screen.attr("class", "");
  };

  Scene.prototype.initAutoPlay = function() {
    var $play = this.$container.find("div.play");

    if ($play.length) {
      $play.on("click", $.proxy(this.autoPlay, this));
    }
  };

  Scene.prototype.autoPlay = function(event) {
    event.preventDefault();

    var scrollTo = this.$container.next(".share").offset().top;

    $("html, body")
      .stop()
      .animate({scrollTop: scrollTo}, this.scrollSpeed, "linear")
      // user interaction cancels autoplay
      .bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
          $(this).stop().unbind();
        }
    });
  };

  // calculate offset of elements for updating the position of elements on scroll
  Scene.prototype.calculateOffset = function(origin, trigger, speed) {
    // animOrigin = Element offset
    // animTrigger = Position of variable "distance" when animation begins
    // animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
    return (this.distance - trigger)/speed + origin;
  };

  this.Scene = Scene;
})();
