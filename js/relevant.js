(function($) {
  var relevant = new Scene("walking", 10000);

  relevant.init = function() {
    this.$explosion = $('#explosion');
    this.$projectile = $('#projectile');
    this.$projectile2 = $('#projectile2');
    this.$skill1 = $('#skill1');
    this.$skill2 = $('#skill2');
    this.$bear = $('#bear');
    this.$scroll = $('#walking .scroll');

    $(window).on("scroll", $.proxy(this.onScroll, this));
    this.$scroll.on("click", $.proxy(this.autoPlay, this));
  };

    // recalculate the screen height and scene height, then set the heights
    // on the matching divs using new values
  relevant.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
  };

  relevant.onScroll = function(event) {
    var distance = this.distance();

    this.setScrollSpeed(distance);
    this.condtionallyFixateScene(distance);

    // Move elements on scroll
    var animUpdate; // Used only for console.log
    function myCalc(animOrigin, animTrigger, animSpeed) {
      // animOrigin = Element offset
      // animTrigger = Position of variable "distance" when animation begins
      // animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
      animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
    }

    // Update sprites on scroll
    var spriteUpdate = 0;
    function mySprite(spriteSpeed, spriteNum) {
      // spriteSpeed = Pixels scrolled between sprite triggers
      // spriteNum = Number of sprites in animation
      spriteUpdate = Math.abs((Math.ceil(distance/spriteSpeed))%spriteNum);
    }

    // Explosion Function
    this.triggerExplosion(distance);

    // Animations!

    // Projectile Test
    if ( distance >= 3160 ) {
      this.$projectile.css('right', '480px');
    } else if ( distance >= 1000 && distance < 3160 ) {
      myCalc(-550,1000,2);
      this.$projectile.css('right', animUpdate);
    } else {
      this.$projectile.css('right', '-550px');
    }

    // Projectile (2) Test
    if ( distance >= 6160 ) {
      this.$projectile2.css('right', '480px');
    } else if ( distance >= 4000 && distance < 6160 ) {
      myCalc(-550,4000,2);
      this.$projectile2.css('right', animUpdate);
    } else {
      this.$projectile2.css('right', '-550px');
    }

    // Skill Test
    if ( distance < 3000 ) {
      this.$skill1.css({'bottom': 0, 'opacity': 0});
    } else if ( distance >= 3000 && distance < 3140 ) {
      myCalc(0,3000,10);
      this.$skill1.css({'bottom': animUpdate, 'opacity': (animUpdate/14)});
    } else if ( distance >= 3140 && distance <= 3390 ) {
      this.$skill1.css({'bottom': '14px', 'opacity': 1});
    } else if ( distance > 3390 && distance <= 3530 ) {
      myCalc(0,3390,1);
      this.$skill1.css({'bottom': '14px', 'opacity': (1-(animUpdate/140))});
    } else {
      this.$skill1.css({'bottom': '14px', 'opacity': 0});
    }

    // Skill (2) Test
    if ( distance < 6000 ) {
      this.$skill2.css({'bottom': 0, 'opacity': 0});
    } else if ( distance >= 6000 && distance < 6140 ) {
      myCalc(0,6000,10);
      this.$skill2.css({'bottom': animUpdate, 'opacity': (animUpdate/14)});
    } else if ( distance >= 6140 && distance <= 6390 ) {
      this.$skill2.css({'bottom': '14px', 'opacity': 1});
    } else if ( distance > 6390 && distance <= 6530 ) {
      myCalc(0,6390,1);
      this.$skill2.css({'bottom': '14px', 'opacity': (1-(animUpdate/140))});
    } else {
      this.$skill2.css({'bottom': '14px', 'opacity': 0});
    }

    // Walking Sprite Update at Negative Distance
    if ( distance <= 0 && distance >= -M.screenHeight ) {
      mySprite(100,6);
      if ( spriteUpdate == 0 ) {
        this.$bear.attr('class', 'f0');
      } else if ( spriteUpdate == 1 ) {
        this.$bear.attr('class', 'f5');
      } else if ( spriteUpdate == 2 ) {
        this.$bear.attr('class', 'f4');
      } else if ( spriteUpdate == 3 ) {
        this.$bear.attr('class', 'f3');
      } else if ( spriteUpdate == 4 ) {
        this.$bear.attr('class', 'f2');
      } else if ( spriteUpdate == 5 ) {
        this.$bear.attr('class', 'f1');
      }
    }

    // Walking Sprite Update
    if ( distance <= this.walkingHeight && distance > 0 ) {
      mySprite(100,6);
      if ( spriteUpdate == 0 ) {
        this.$bear.attr('class', 'f0');
      } else if ( spriteUpdate == 1 ) {
        this.$bear.attr('class', 'f1');
      } else if ( spriteUpdate == 2 ) {
        this.$bear.attr('class', 'f2');
      } else if ( spriteUpdate == 3 ) {
        this.$bear.attr('class', 'f3');
      } else if ( spriteUpdate == 4 ) {
        this.$bear.attr('class', 'f4');
      } else if ( spriteUpdate == 5 ) {
        this.$bear.attr('class', 'f5');
      }
    }

    // Walking Right Test
    if ( distance >= -650 && distance < 1460 ) {
      myCalc(-650,-650,2);
      this.$bear.css('left', animUpdate);
    } else if ( distance >= 1460 && distance <= 9000 ) {
      this.$bear.css('left', '405px');
    } else if ( distance > 9000 ) {
      myCalc(405,9000,2);
      this.$bear.css('left', animUpdate);
    } else {
      this.$bear.css('left', '-650px');
    }

    console.log(distance);
    // Dev overlay -> Remove
    $('#cursprite').html(spriteUpdate);
    $('#curposition').html(distance);
  };

  relevant.autoPlay = function(event) {
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

  relevant.triggerExplosion = function(distance) {
    var startExplosion = 6140;

    if (distance < 6140) {
      startExplosion = 3140;
    }

    // startExplosion = Distance to trigger animation
    if (distance >= startExplosion && distance <= startExplosion + 50) {
      this.$explosion.attr('class', 'f0');
    } else if (distance > startExplosion + 50 && distance <= startExplosion + 100) {
      this.$explosion.attr('class', 'f1');
    } else if (distance > startExplosion + 100 && distance <= startExplosion + 150) {
      this.$explosion.attr('class', 'f2');
    } else if (distance > startExplosion + 150 && distance <= startExplosion + 200) {
      this.$explosion.attr('class', 'f3');
    } else if (distance > startExplosion + 200 && distance <= startExplosion + 250) {
      this.$explosion.attr('class', 'f4');
    } else {
      this.$explosion.attr('class', 'hidden');
    }
  };

  this.M.register(relevant);
})(jQuery);
