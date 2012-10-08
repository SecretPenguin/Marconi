(function($) {
  var cogs = new Scene("cogs", 18000);

  cogs.init = function() {
    this.$cogShift = $('#cogShift');
    this.$scroll = $('#cogs .scroll');
    this.$cogSR = $('.cogS.rev');
    this.$cogSN = $('.cogS.norm');
    this.$cogMR = $('.cogM.rev');
    this.$cogMN = $('.cogM.norm');
    this.$cogLR = $('.cogL.rev');
    this.$cogLN = $('.cogL.norm');
    this.$cogXlR = $('.cogXL.rev');
    this.$cogXlN = $('.cogXL.norm');
    this.$cogLeft = $('#cogLeft');
    this.$cogRight = $('#cogRight');
    this.$hideLeft = $('#hideLeft');
    this.$hideRight = $('#hideRight');
    this.$cogTagline = $('#cogTagline');

    this.$scroll.on("click", $.proxy(this.autoPlay, this));
  };

  cogs.onResize = function(event) {
    this.$screen.height(M.screenHeight);
  };

  cogs.onScroll = function(event) {
    var distance = this.distance();

    // Update play speed based on distance from end
    this.setScrollSpeed(distance);
    this.conditionallyFixateScene(distance);

    // Move elements on scroll
    var animUpdate; // Used only for console.log
    function myCalc(animOrigin, animTrigger, animSpeed) {
      // animOrigin = Element offset
      // animTrigger = Position of variable "distance" when animation begins
      // animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
      animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
    }

    // Rotation
    var rotateSpeedS = distance/2;
    var rotateSpeedM = distance/4;
    var rotateSpeedL = distance/6;
    var rotateSpeedXL = distance/8;
    if ( distance >= -M.screenHeight && distance <= this.sceneLength ) {
      this.$cogSR.rotate(- rotateSpeedS);
      this.$cogSN.rotate(rotateSpeedS);
      this.$cogMR.rotate(- rotateSpeedM);
      this.$cogMN.rotate(rotateSpeedM);
      this.$cogLR.rotate(- rotateSpeedL);
      this.$cogLN.rotate(rotateSpeedL);
      this.$cogXlR.rotate(- rotateSpeedXL);
      this.$cogXlN.rotate(rotateSpeedXL);
    }

    // Cog Scroll
    var cogScroll = -distance/3;
    if ( distance >= 0 && distance <= this.sceneLength ) {
      this.$cogShift.css('top', cogScroll);
    }

    // Cogs Shift Test
    if ( distance >= 5500 && distance < 8000 ) {
      myCalc(0,5500,30);
      this.$cogShift.css('left', animUpdate);
    } else if ( distance >= 9000 && distance <= 13500 ) {
      myCalc(84,9000,25);
      var animUpdateTurn = -(animUpdate - 2*84); // Very crappy way of switching movement of animation
      this.$cogShift.css('left', animUpdateTurn);
    } else if ( distance > 13500 ) {
      this.$cogShift.css('left', -96); // Make this (-96) be set by the last position of the cog shift
    }

    // Most likely removing this section - ignore until confirmed, then destroy!
    // If we do use, fix NaN issue
    // Cog Depth
/*
      $('.back').each(function() {
        $back = $(this);
        backTop = parseInt($back.css('top'));
        cogHeight = $back.height();
        percentShift = (backTop + cogScroll + cogHeight/2)/M.screenHeight;
        updateMargin = -16*percentShift;
        if ( percentShift >= 0 && percentShift <=1 ) {
          $back.css('margin-top', updateMargin);
        } else if ( percentShift < 0 ) {
          $back.css('margin-top', 0);
        }
      });
*/

    // Tagline
    if ( distance < 500 ) {
      this.$cogTagline.css('margin-top', 0);
      this.$cogLeft.css('margin-left', '-440px');
      this.$cogRight.css('margin-right', '-590px');
      this.$hideLeft.css('margin-left', '-525px');
      this.$hideRight.css('margin-right', '-525px');
    } else if ( distance >= 500 && distance <= 1540 ) {
      myCalc(0,500,4);
      this.$cogLeft.css('margin-left', (-440 + animUpdate));
      this.$cogRight.css('margin-right', (-590 + animUpdate ));
      this.$hideLeft.css('margin-left', (-525 + animUpdate));
      this.$hideRight.css('margin-right', (-525 + animUpdate));
    } else if ( distance > 1540 && distance <= this.sceneLength ) {
      myCalc(0,1540,5);
      this.$cogTagline.css('margin-top', -animUpdate);
      this.$cogLeft.css('margin-left', '-180px');
      this.$cogRight.css('margin-right', '-330px');
      this.$hideLeft.css('margin-left', '-268px');
      this.$hideRight.css('margin-right', '-268px');
    }

    console.log(distance);
  };

  cogs.autoPlay = function(event) {
    var $pageContainer = $('html, body');

    event.preventDefault();
    var full_url = event.target.href;
    //split the url by # and get the anchor target name
    var parts = full_url.split("#");
    var trgt = parts[1];
    //get the top offset of the target anchor
    var target_offset = $("#"+trgt).offset();
    var target_top = target_offset.top;
    //goto that anchor by setting the body scroll top to anchor top
    // Set scrollSpeed by setting setSpeed
    $pageContainer.stop().animate({scrollTop:target_top}, this.scrollSpeed, 'linear');

    // Stop animation on scroll
    $pageContainer.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
      if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
        $pageContainer.stop().unbind();
      }
    });
  };

  this.M.register(cogs);
})(jQuery);
