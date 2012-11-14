(function($) {
  var enroll = new Scene("enroll", 1050);

  enroll.init = function() {
    this.$affordable = $('#affordable');
    this.$callToAction = $('#call-to-action');

  };

  enroll.onScroll = function(event) {
    this.conditionallyFixateScene();
    
    // most scenes just need their container resized to fit the scene
    this.$container.height(this.sceneLength);
        
    // Tagline
    if (this.distance < 0) {
      newOffset = this.calculateOffset(0, 0, 6);
      this.$affordable.css('top', (150 - newOffset));
    } else if (this.distance >= 0 && this.distance <= 1850) {
      newOffset = this.calculateOffset(0, 0, 3);
      this.$affordable.css('top', (150 - newOffset));
    } else {
      this.$affordable.css('top', -500);
    }
  };
  
  this.M.register(enroll);
})(jQuery);
