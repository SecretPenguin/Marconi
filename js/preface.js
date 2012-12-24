(function($) {
  var preface = new Scene("preface", 2000);

  preface.init = function() {
    this.$intro = $('#intro');
  	this.$slider = $('#slider');
  	this.$title = $('h1, #introduces');
  	this.$purpleBG = $('#purpleBG');
  	this.$preface = $('#preface');
  	this.$scroll = $('#scrollDown');
  	this.$bellevueLogo = $('#logo a');

    this.startSlider();
  };

  preface.onScroll = function(event) {
    this.conditionallyFixateScene();


    if (this.distance <= 500) {
      this.$scroll.delay('5000').queue(function() {
        $(this).addClass('showScroll');
        $(this).dequeue();
      });
    } else if (this.distance > 500) {
      this.$scroll.removeClass('showScroll');
    }

    if (this.distance <= 100) {
      this.$intro.css('opacity', 1).show();
    } else if (this.distance > 100 && this.distance <= 900) {
      this.$intro.css('opacity', ((800 - (this.distance - 100))/800)).show();
    } else if (this.distance > 900) {
      this.$intro.css('opacity', 0).hide();
    }

    if (this.distance <= 500) {
      this.$purpleBG.css('opacity', 1);
      this.$preface.css('background-color', '#1c1422');
      this.$bellevueLogo.css('opacity', 0);
    } else if (this.distance > 500 && this.distance <= 1000) {
      this.$purpleBG.css('opacity', (500 - (this.distance - 500))/500);
      this.$preface.css('background-color', '#fff');
      this.$bellevueLogo.css('opacity', (this.distance - 500)/500);
    } else if (this.distance >= 1000) {
      this.$purpleBG.css('opacity', 0);
      this.$preface.css('background-color', '#fff');
      this.$bellevueLogo.css('opacity', 1);
    }

    if (this.distance <= 900) {
      this.$title.css('opacity', 0);
    } else if (this.distance > 900 && this.distance < 1300) {
   	  this.$title.css('opacity', ((this.distance - 900)/400));
    } else if (this.distance >= 1300) {
      this.$title.css('opacity', 1);
    }
  };

  preface.startSlider = function() {
    this.startingSlide = M.startingSlide || 0;

    this.$slider.cycle({
      fx:'fade',
      speedOut: 300,
      speedIn: 1100,
      timeout:0,
      next: '#intro p',
      startingSlide: this.startingSlide,
      cleartypeNoBg: true,
      pager: '#slider-nav',
      pagerAnchorBuilder: function paginate(idx, el) {
			return '#slider-nav li:eq(' + idx + ') a';
			},
      after: function(currSlideElement, nextSlideElement, options) {
        $(document).trigger("preface.switch", options.currSlide);
      }
    });
  };

  this.M.register(preface);
})(jQuery);
