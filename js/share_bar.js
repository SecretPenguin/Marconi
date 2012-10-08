(function($, undefined) {
  function ShareBar($container, scene) {
    this.$container = $container;
    this.scene = scene;
    this.height = this.$container.height();
  };

  ShareBar.prototype.top = function() {
    return this.$container.offset().top;
  }

  ShareBar.prototype.bottom = function() {
    return this.top() + this.height;
  }

  this.ShareBar = ShareBar;
})(jQuery);
