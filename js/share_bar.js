(function($, undefined) {
  function ShareBar($container, scene) {
    this.$container = $container;
    this.$copyButton = this.$container.find("a.share-copy-button");
    this.scene = scene;
  };

  ShareBar.prototype.init = function() {
    this.$copyButton.zclip({
      path:"/js/vendor/ZeroClipboard.swf",
      copy: function() { return $(this).siblings("input").val(); },
      afterCopy: function() {
        $(this)
          .siblings(".copy-confirm")
          .animate({"top": "-18px", "opacity": "1"}, 1000, function(){
            $(this).delay(3000).animate({"top": "0", "opacity": "0"}, 100);
        });
      }
    });
  };

  ShareBar.prototype.onLoad = function() {
    this.calculateProperties();
  };

  ShareBar.prototype.name = function() {
    return this.scene.containerId;
  };

  ShareBar.prototype.calculateProperties = function() {
    this.height = this.$container.height();
    this.top = this.$container.offset().top;
    this.bottom = this.top + this.height;
  };

  ShareBar.prototype.activateScene = function() {
    if (!this.scene.active) {
      console.log("activating scene " + this.scene.containerId);
      this.scene.active = true;
    }
  };

  ShareBar.prototype.deactivateScene = function() {
    if (this.scene.active) {
      console.log("deactivating scene " + this.scene.containerId);
      this.scene.unFixateScene();
      this.scene.active = false;
    }
  };

  this.ShareBar = ShareBar;
})(jQuery);
