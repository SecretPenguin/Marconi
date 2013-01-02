(function($, undefined) {
  function ShareBar($container, scene) {
    this.$container = $container;
    this.$copyButton = this.$container.find("a.share-copy-button");
    this.scene = scene;
    this.height = 103; // default - recalculated from container
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

    this.$container.find("a.facebook-link").click(function(event) {
      event.preventDefault();

      var $clicked = $(this);
      var fbParams = {
        method: "feed",
        redirect_uri: $(this).data("url"),
        link: $(this).data("url"),
        picture: "http://flexxivelearning.bellevue.edu/images/share/fb-share.jpg",
        name: "Flexxive",
        caption: "Bellevue University",
        description: "Are you ready for a new way to learn?"
      };

      function callback(reponse) {
        console.log(response);
      }

      FB.ui(fbParams, callback);
    });
  };

  ShareBar.prototype.onLoad = function() {
    this.calculateProperties();
  };

  ShareBar.prototype.onResize = function() {
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
      this.scene.active = true;
    }
  };

  ShareBar.prototype.deactivateScene = function() {
    if (this.scene.active) {
      this.scene.unFixateScene();
      this.scene.active = false;
    }
  };

  this.ShareBar = ShareBar;
})(jQuery);
