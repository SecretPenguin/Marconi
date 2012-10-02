(function($) {
  var preface = new Scene("preface", 2000);

  preface.init = function() {
  	this.$slider = $('#intro');
  	this.$title = $('h1');
    
    $(window).on("scroll", $.proxy(this.onScroll, this));
    
    this.startSlider();
  };

  preface.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
  };

  preface.onScroll = function(event) {
    var distance = this.distance();

    this.conditionallyFixateScene(distance);
    
    if (distance <= 100) {
      this.$slider.css('opacity', 1);
    } else if (distance > 100 && distance <= 900) {
      this.$slider.css('opacity', ((200 - (distance - 100)/4)/200));
    } else if (distance > 900) {
      this.$slider.css('opacity', 0);
    }
    
    if (distance > 1000 && distance < 1400) {
   	  this.$title.css('opacity', ((distance - 1000)/400));
    } else if (distance >= 1400) {
      this.$title.css('opacity', 1);
    } else {
      this.$title.css('opacity', 0);
    }

    console.log(distance);
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
