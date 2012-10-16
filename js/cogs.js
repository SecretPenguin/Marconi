(function($) {
  var cogs = new Scene("cogs", 5500);

  cogs.init = function() {
    this.$cogGroup = $('#cogGroup');
    this.$cogPhase2 = $('#cogPhase2');
    this.$cogPhase3 = $('#cogPhase3');
    this.$exitCogs = $('#exitCogs');
    this.$cogBG = $('#cogsBG');
    this.$scroll = $('#cogs .scroll');
    this.$cogSR = $('.cogS.rev');
    this.$cogSN = $('.cogS.norm');
    this.$cogMR = $('.cogM.rev');
    this.$cogMN = $('.cogM.norm');
    this.$cogTagline = $('#cogTagline');
  };

  cogs.onResize = function(event) {
    this.$screen.height(M.screenHeight);
  };

  cogs.onScroll = function(event) {
    this.calculateScrollSpeed();
    this.conditionallyFixateScene();

    // Rotation
    var rotateSpeedS = this.distance/6;
    var rotateSpeedM = this.distance/12;

    if ( this.distance >= -M.screenHeight && this.distance <= this.sceneLength) {
      this.$cogSR.rotate(- rotateSpeedS);
      this.$cogSN.rotate(rotateSpeedS);
      this.$cogMR.rotate(- rotateSpeedM);
      this.$cogMN.rotate(rotateSpeedM);
    }
    
    var newOffset;
    
    // Background Scroll
    if (this.distance < 0) {
      this.$cogBG.css('top', 0);
    } else {
      newOffset = this.calculateOffset(0, 0, 30);
      this.$cogBG.css('top', -newOffset);
    }

    // Cog Scroll - Group
    if (this.distance < 0) {
      this.$cogGroup.css('top', 1000);
    } else if ( this.distance >= 0 && this.distance <= 1290 ) {
      newOffset = this.calculateOffset(0, 0, 1.5);
      this.$cogGroup.css('top', (1000 - newOffset));
    } else  if (this.distance >= 4000) {
      newOffset = this.calculateOffset(0, 4000, 2);
      this.$cogGroup.css('top', (140 - newOffset));
    } else {
      this.$cogGroup.css('top', 140);
    }
    
    // Cog Scroll - Phase 2
    if (this.distance < 0) {
      this.$cogPhase2.css('top', 251);
    } else if ( this.distance >= 0 && this.distance <= 1760 ) {
      newOffset = this.calculateOffset(0, 0, 10);
      this.$cogPhase2.css('top', (251 - newOffset));
    } else {
      this.$cogPhase2.css('top', 75);
    }
    
    // Cog Scroll - Phase 3
    if (this.distance < 0) {
      this.$cogPhase3.css('top', 678);
    } else if ( this.distance >= 0 && this.distance <= 2640 ) {
      newOffset = this.calculateOffset(0, 0, 5);
      this.$cogPhase3.css('top', (678 - newOffset));
    } else {
      this.$cogPhase3.css('top', 150);
    }
    
    // Cog Scroll - Exit Cogs
    if (this.distance < 0) {
      this.$exitCogs.css('top', 928);
    } else if ( this.distance >= 0 && this.distance <= 3520 ) {
      newOffset = this.calculateOffset(0, 0, 5);
      this.$exitCogs.css('top', (928 - newOffset));
    } else {
      this.$exitCogs.css('top', 224);
    }
    

    // Tagline
    if (this.distance < 0) {
      this.$cogTagline.css('top', 400);
    } else if (this.distance >= 0 && this.distance <= 1050) {
      newOffset = this.calculateOffset(0, 0, 3);
      this.$cogTagline.css('top', (400 - newOffset));
    } else  if (this.distance >= 4000) {
      newOffset = this.calculateOffset(0, 4000, 2);
      this.$cogTagline.css('top', (50 - newOffset));
    } else {
      this.$cogTagline.css('top', 50);
    }
  };

  this.M.register(cogs);
})(jQuery);