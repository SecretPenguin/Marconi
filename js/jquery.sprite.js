(function($, undefined) {
  var getBgY = function($el) {
    if ($.browser.msie) {
      return $el.css("background-position-y") || "0";
    } else {
      return ($el.css("background-position") || " ").split(" ")[1];
    }
  }

  $.fn.extend({
    sprite: function(options) {
      var $el = $(this);
      var opts = $.extend({
        width: 100,
        startFrame: 1,
        endFrame: 19,
        fps: 10,
        andThen: null
      }, options || {});

      var frame = opts.startFrame;
      var yOffset = getBgY($el);

      $el.data("spriting", true);

      var animate = function($el, frame) {
        if (frame <= opts.endFrame) {
          $el.css("background-position", "-" + (frame * opts.width) + "px " + yOffset);
          frame++;

          setTimeout(function() {
            animate($el, frame);
          }, parseInt(1000 / opts.fps));
        } else {
          $el.data("spriting", false);

          if ($.isFunction(opts.andThen)) {
            opts.andThen($el);
          }
        }
      };

      animate($el, frame);

      return this;
    },
    isSpriting: function() {
      return $(this).data("spriting");
    },
    spriteOut: function(andThen) {
      var $self = $(this);

      if ($self.isSpriting()) {
        return false;
      }

      $self.sprite({
        startFrame: 13,
        endFrame: 19,
        andThen: andThen
      });

      return this;
    },
    spriteIn: function(andThen) {
      var $self = $(this);

      if ($self.isSpriting()) {
        return false;
      }

      $self.sprite({
        startFrame: 1,
        endFrame: 13,
        andThen: andThen
      });

      return this;
    },
    spriteOutAndBackIn: function() {
      var $self = $(this);
      $self.spriteOut(function($el) {
        $el.spriteIn();
      });
    }
  });
})(jQuery);
