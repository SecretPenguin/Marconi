(function($) {
  var enroll = new Scene("enroll", 1200);

  enroll.init = function() {
    this.$affordable = $('#affordable');
    this.$callToAction = $('#call-to-action');

  };

  enroll.onScroll = function(event) {
    this.conditionallyFixateScene();
    
    
    // Forms Scroll
    if ( this.distance <= 1200 + M.screenHeight ) {
      newOffset = this.calculateOffset(0, 0, 2);
      this.$callToAction.css('top', (600 - newOffset));
    }
    
    // Tagline
    if (this.distance < 0) {
      newOffset = this.calculateOffset(0, 0, 6);
      this.$affordable.css('top', (200 - newOffset));
    } else if (this.distance >= 0 && this.distance <= 1850) {
      newOffset = this.calculateOffset(0, 0, 3);
      this.$affordable.css('top', (200 - newOffset));
    } else {
      this.$affordable.css('top', -500);
    }
  };
  
  this.M.register(enroll);
})(jQuery);
