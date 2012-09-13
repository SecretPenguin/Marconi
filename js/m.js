(function($, undefined) {
  function PageController() {
    this.scenes = [];
    $(window).on("resize", $.proxy(this.onResize, this));
  }

  PageController.prototype.init = function() {
    for (var i = 0; i < this.scenes.length; i++) {
      this.scenes[i].init();
    }

    // trigger a resize to set the initial screen height
    $(window).resize();
  }

  PageController.prototype.register = function(scene) {
    this.scenes.push(scene);
  }

  PageController.prototype.onResize = function(event) {
    this.screenHeight = $(window).height();

    for (var i = 0; i < this.scenes.length; i++) {
      var scene = this.scenes[i];

      if (scene.hasOwnProperty("onResize")) {
        scene.onResize(event);
      }
    }
  }

  this.M = new PageController();

  $(document).ready(function() {
    M.init();
  });
})(jQuery);
