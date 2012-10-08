(function($, undefined) {
  this.M = {
    scenes: [],
    shareBars: [],
    activeScenes: [],

    init: function() {
      this.eachScene(function(scene) {
        scene.init();
      });

      $(window).on("resize", $.proxy(this.onResize, this));
      $(window).on("scroll", $.proxy(this.onScroll, this));
      // trigger a resize to set the initial screen height
      $(window).resize();
    },

    // add Scene to scenes and set up shareBar if scene has one
    register: function(scene) {
      if (scene.shareBar()) {
        this.shareBars.push(scene.shareBar());
      }

      this.scenes.push(scene);
    },

    onResize: function(event) {
      this.screenHeight = $(window).height();

      this.eachScene(function(scene) {
        if (scene.hasOwnProperty("onResize")) {
          scene.onResize(event);
        }
      });
    },

    onScroll: function(event) {
      // monitoring share divs for scene activation/deactivation

      $.each(this.activeScenes, function() {
        this.onScroll();
      });
    },

    // call fn on each scene, passing the scene as the only argument
    // and keeping M as this
    eachScene: function(fn) {
      for (var i = 0; i < this.scenes.length; i++) {
        var scene = this.scenes[i];

        fn.call(this, scene);
      }
    },

    // activateScene: function(scene) {
    //   this.activeScenes.push(scene);
    // },

    // deactivateScene: function(scene) {
    //   var sceneIndex = this.activeScenes.indexOf(scene);

    //   if (sceneIndex != -1) {
    //     this.activeScenes.splice(sceneIndex, 1);
    //   }
    // }
  };

  $(document).ready(function() {
    M.init();
  });
})(jQuery);
