(function($, undefined) {
  function PageController() {
    this.sections = [];
  }

  PageController.prototype.init = function() {
    for (var i = 0; i < this.sections.length; i++) {
      this.sections[i].init();
    }
  }

  PageController.prototype.register = function(section) {
    console.log("register!");
    this.sections.push(section);
  }

  this.M = new PageController();

  $(document).ready(function() {
    M.init();
  });
})(jQuery);
