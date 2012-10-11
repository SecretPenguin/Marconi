(function($) {
  var preface = new Scene("preface", 2000);

  preface.init = function() {
  	this.$slider = $('#intro');
  	this.$title = $('h1');

    this.startSlider();
  };

  preface.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
  };

  preface.onScroll = function(event) {
    this.conditionallyFixateScene();

    if (this.distance <= 100) {
      this.$slider.css('opacity', 1);
    } else if (this.distance > 100 && this.distance <= 900) {
      this.$slider.css('opacity', ((200 - (this.distance - 100)/4)/200));
    } else if (this.distance > 900) {
      this.$slider.css('opacity', 0);
    }

    if (this.distance <= 1000) {
      this.$title.css('opacity', 0);
    } else if (this.distance > 1000 && this.distance < 1400) {
   	  this.$title.css('opacity', ((this.distance - 1000)/400));
    } else if (this.distance >= 1400) {
      this.$title.css('opacity', 1);
    }
  };

  preface.startSlider = function() {
    this.$slider.cycle({
      fx:'fade',
      speed: 800,
      timeout:0,
      next: '#intro p',
      startingSlide: Math.floor(Math.random()*4),
      cleartypeNoBg: true
    });
  };

  this.M.register(preface);
})(jQuery);
