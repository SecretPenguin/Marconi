(function($, undefined) {
  function ShareBar($container, scene) {
    this.$container = $container;
    this.scene = scene;
  };

  ShareBar.prototype.onLoad = function() {
    this.calculateHeight();
    this.calculateTopBottom();
  };

  ShareBar.prototype.name = function() {
    return this.scene.containerId;
  };

  ShareBar.prototype.calculateHeight = function() {
    this.height = this.$container.height();
  };

  ShareBar.prototype.calculateTopBottom = function() {
    this.top = this.$container.offset().top;
    this.bottom = this.top + this.height;
  };

  ShareBar.prototype.isOnScreen = function(screenTop, screenBottom) {
    var isOnScreen = false;

    if (this.top > screenTop && this.bottom <= screenBottom) {
      isOnScreen = true;
    }

    return isOnScreen;
  }

  ShareBar.prototype.activateScene = function() {
    if (!this.scene.active) {
      console.log("activating scene " + this.scene.containerId);
      this.scene.active = true;
    }
  };

  ShareBar.prototype.deactivateScene = function() {
    if (this.scene.active) {
      console.log("deactivating scene " + this.scene.containerId);
      this.scene.active = false;
    }
  };

  this.ShareBar = ShareBar;
})(jQuery);
