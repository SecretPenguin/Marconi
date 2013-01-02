(function($, undefined) {
  // stub out console.log for browsers that don't have it
  if (this.console === undefined) {
    this.console = {
      log: function() {}
    }
  }

  this.M = {
    scenes: [],
    shareBars: [],
    screenHeight: null,
    screenTop: null,
    screenBottom: null,
    startingSlide: Math.floor(Math.random()*4),

    init: function() {
      FB.init({appId: "300137136773338", status: true, cookie: true});
      $.preloadCssImages();

      this.eachScene(function(scene) {
        scene.init();
      });

      this.eachShareBar(function(shareBar) {
        shareBar.init();
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

    // call position-related stuff here so calculations will be correct
    onLoad: function(event) {
      this.eachScene(function(scene) {
        scene.onLoad();
      });

      this.eachShareBar(function(shareBar) {
        shareBar.onLoad();
      });
    },

    onResize: function(event) {
      this.calculateScreenHeight();
      this.calculateScreenTopBottom();

      this.eachScene(function(scene) {
        scene.beforeResize(event);
        scene.onResize(event);
      });

      this.eachShareBar(function(shareBar) {
        shareBar.onResize(event);
      });

      $(window).trigger("scroll");
    },

    onScroll: function(event) {
      this.calculateScreenTopBottom();

      var shareBarsCopy = this.shareBars.slice();
      var shareBarIndex = this.onScreenShareBarIndex();
      var shareBarsToActivate = 2;

      // there is no on screen share bar. get the next one below and activate
      // only its scene
      if (shareBarIndex === undefined) {
        shareBarIndex = this.belowScreenShareBarIndex();
        shareBarsToActivate = 1;
      }

      var active = shareBarsCopy.splice(shareBarIndex, shareBarsToActivate);

      for (var i = 0; i < active.length; i++) {
        active[i].activateScene();
      }

      for (var i = 0; i < shareBarsCopy.length; i++) {
        shareBarsCopy[i].deactivateScene();
      }

      this.eachScene(function(scene) {
        if (scene.active) {
          scene.beforeScroll();
          scene.onScroll();
          scene.afterScroll();
        }
      });
    },

    calculateScreenHeight: function() {
      this.screenHeight = $(window).height();
    },

    calculateScreenTopBottom: function() {
      this.screenTop = $(window).scrollTop();
      this.screenBottom = this.screenTop + this.screenHeight;
    },

    onScreenShareBarIndex: function() {
      var onScreenShareBarIndex;
      var self = this;

      $.each(this.shareBars, function(index, shareBar) {
        if (self.isOnScreen(shareBar)) {
          onScreenShareBarIndex = index;
          return false; // early break from $.each
        }
      });

      return onScreenShareBarIndex;
    },

    belowScreenShareBarIndex: function() {
      var screenBottom = this.screenBottom;

      var distances = $.map(this.shareBars, function(shareBar) {
        var distance = shareBar.bottom - screenBottom;

        if (distance < 0) {
          return NaN;
        } else {
          return distance;
        }
      });

      var closestDistance = _.min(distances);
      var closestIndex = _.indexOf(distances, closestDistance);

      return closestIndex;
    },

    // call fn on each scene, passing the scene as the only argument
    // and keeping M as this
    eachScene: function(fn) {
      for (var i = 0; i < this.scenes.length; i++) {
        var scene = this.scenes[i];

        fn.call(this, scene);
      }
    },

    eachShareBar: function(fn) {
      for (var i = 0; i < this.shareBars.length; i++) {
        var shareBar = this.shareBars[i];

        fn.call(this, shareBar);
      }
    },

    isOnScreen: function(object) {
      if (object.top > this.screenTop && object.bottom <= this.screenBottom) {
        return true;
      } else {
        return false;
      }
    },

    shareBarHeight: function() {
      return this.shareBars[0].height;
    },

    // this is the optimal way of setting a jQuery object's class name
    setClassName: function($target, name) {
      $target[0].className = name;
    }
  };

  $(document).ready(function() {
    M.init();
  });

  $(window).on("load", $.proxy(M.onLoad, M));
})(jQuery);
