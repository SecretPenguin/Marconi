(function($, undefined) {
  function PageController() {
    this.sections = [];
    $(window).on("resize", $.proxy(this.onResize, this));
  }

  PageController.prototype.init = function() {
    for (var i = 0; i < this.sections.length; i++) {
      this.sections[i].init();
    }

    // trigger a resize to set the initial screen height
    $(window).resize();
  }

  PageController.prototype.register = function(section) {
    this.sections.push(section);
  }

  PageController.prototype.onResize = function(event) {
    this.screenHeight = $(window).height();

    for (var i = 0; i < this.sections.length; i++) {
      var section = this.sections[i];

      if (section.hasOwnProperty("onResize")) {
        section.onResize(event);
      }
    }
  }

  this.M = new PageController();

  $(document).ready(function() {
    M.init();
  });
})(jQuery);
