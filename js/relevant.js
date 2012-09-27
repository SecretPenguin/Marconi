(function($) {
  var relevant = new Scene("walking", 16000);

  relevant.init = function() {
    this.$explosion = $('#explosion');
    this.$projectile = $('#projectile');
    this.$allSkills = $('.skill');
    this.$skill1 = $('#skill1');
    this.$skill2 = $('#skill2');
    this.$skill3 = $('#skill3');
    this.$skill4 = $('#skill4');
    this.$skill5 = $('#skill5');
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
    this.conditionallyFixateScene(distance);

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

    // Animations!

    // Explosion Function
    this.triggerExplosion(distance);
    
    // Projectile Function
    this.triggerProjectile(distance);
    
    // Skill Function
    this.triggerSkill(distance);

    // Walking Sprite Update at Negative Distance
    if ( distance <= 0 && distance >= -M.screenHeight ) {
      mySprite(50,18);
      switch(spriteUpdate) {
      case 0:
        this.$bear.attr('class', 'f0');
        break;
      case 1:
        this.$bear.attr('class', 'f17');
        break;
      case 2:
        this.$bear.attr('class', 'f16');
        break;
      case 3:
        this.$bear.attr('class', 'f15');
        break;
      case 4:
        this.$bear.attr('class', 'f14');
        break;
      case 5:
        this.$bear.attr('class', 'f13');
        break;
      case 6:
        this.$bear.attr('class', 'f12');
        break;
      case 7:
        this.$bear.attr('class', 'f11');
        break;
      case 8:
        this.$bear.attr('class', 'f10');
        break;
      case 9:
        this.$bear.attr('class', 'f9');
        break;
      case 10:
        this.$bear.attr('class', 'f8');
        break;
      case 11:
        this.$bear.attr('class', 'f7');
        break;
      case 12:
        this.$bear.attr('class', 'f6');
        break;
      case 13:
        this.$bear.attr('class', 'f5');
        break;
      case 14:
        this.$bear.attr('class', 'f4');
        break;
      case 15:
        this.$bear.attr('class', 'f3');
        break;
      case 16:
        this.$bear.attr('class', 'f2');
        break;
      case 17:
        this.$bear.attr('class', 'f1');
        break;
      }
    }

    // Walking Sprite Update
    if ( distance <= this.$container.height() && distance > 0 ) {
      mySprite(50,18);
      switch(spriteUpdate) {
      case 0:
        this.$bear.attr('class', 'f0');
        break;
      case 1:
        this.$bear.attr('class', 'f1');
        break;
      case 2:
        this.$bear.attr('class', 'f2');
        break;
      case 3:
        this.$bear.attr('class', 'f3');
        break;
      case 4:
        this.$bear.attr('class', 'f4');
        break;
      case 5:
        this.$bear.attr('class', 'f5');
        break;
      case 6:
        this.$bear.attr('class', 'f6');
        break;
      case 7:
        this.$bear.attr('class', 'f7');
        break;
      case 8:
        this.$bear.attr('class', 'f8');
        break;
      case 9:
        this.$bear.attr('class', 'f9');
        break;
      case 10:
        this.$bear.attr('class', 'f10');
        break;
      case 11:
        this.$bear.attr('class', 'f11');
        break;
      case 12:
        this.$bear.attr('class', 'f12');
        break;
      case 13:
        this.$bear.attr('class', 'f13');
        break;
      case 14:
        this.$bear.attr('class', 'f14');
        break;
      case 15:
        this.$bear.attr('class', 'f15');
        break;
      case 16:
        this.$bear.attr('class', 'f16');
        break;
      case 17:
        this.$bear.attr('class', 'f17');
        break;
      }
    }
    
    // Coin Sprite
    if ( distance <= this.$container.height() && distance > 0 ) {
      mySprite(50,8);
      switch(spriteUpdate) {
      case 0:
        this.$projectile.attr('class', 'f0');
        break;
      case 1:
        this.$projectile.attr('class', 'f1');
        break;
      case 2:
        this.$projectile.attr('class', 'f2');
        break;
      case 3:
        this.$projectile.attr('class', 'f3');
        break;
      case 4:
        this.$projectile.attr('class', 'f4');
        break;
      case 5:
        this.$projectile.attr('class', 'f5');
        break;
      case 6:
        this.$projectile.attr('class', 'f6');
        break;
      case 7:
        this.$projectile.attr('class', 'f7');
        break;
      }
    }
    
    // Change sprites throughout scene
    // Preload Images - removes flicker
    if (document.images) {	
		img1 = new Image();
		img2 = new Image();
		img3 = new Image();
		img4 = new Image();
		img5 = new Image();
		img6 = new Image();
		img7 = new Image();
		img8 = new Image();
		img1.src = "/images/relevant/sprites/BearSprite-S.gif";
		img2.src = "/images/relevant/sprites/BearSprite-SS.gif";
		img3.src = "/images/relevant/sprites/BearSprite-SN.gif";
		img4.src = "/images/relevant/sprites/BearSprite-N.gif";
		img5.src = "/images/relevant/sprites/BearSprite-NN.gif";
		img6.src = "/images/relevant/sprites/BearSprite-NP.gif";
		img7.src = "/images/relevant/sprites/BearSprite-P.gif";
		img8.src = "/images/relevant/sprites/BearSprite-PP.gif";
	}
    if ( distance >= -650 && distance <= 2650 ) {
      this.$bear.css('background-image', 'url(' + img1.src + ')');
    } else if ( distance > 2650 && distance <= 3550 ) {
      this.$bear.css('background-image', 'url(' + img2.src + ')');
    } else if ( distance > 3550 && distance <= 5350 ) {
      this.$bear.css('background-image', 'url(' + img1.src + ')');
    } else if ( distance > 5350 && distance <= 6250 ) {
      this.$bear.css('background-image', 'url(' + img3.src + ')');
    } else if ( distance > 6250 && distance <= 8050 ) {
      this.$bear.css('background-image', 'url(' + img4.src + ')');
    } else if ( distance > 8050 && distance <= 8950 ) {
      this.$bear.css('background-image', 'url(' + img5.src + ')');
    } else if ( distance > 8950 && distance <= 10750 ) {
      this.$bear.css('background-image', 'url(' + img4.src + ')');
    } else if ( distance > 10750 && distance <= 11650 ) {
      this.$bear.css('background-image', 'url(' + img6.src + ')');
    } else if ( distance > 11650 && distance <= 13450 ) {
      this.$bear.css('background-image', 'url(' + img7.src + ')');
    } else if ( distance > 13450 && distance <= 14350 ) {
      this.$bear.css('background-image', 'url(' + img8.src + ')');
    } else {
      this.$bear.css('background-image', 'url(' + img7.src + ')');
    }

    // Walking Right
    if ( distance >= -650 && distance < 1324 ) {
      myCalc(-650,-650,2);
      this.$bear.css('left', animUpdate);
    } else if ( distance >= 1324 && distance <= 14300 ) {
      this.$bear.css('left', '337px');
    } else if ( distance > 14300 ) {
      myCalc(337,14300,3);
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
    var startExplosion = 13200;

    if (distance < 5800) {
      startExplosion = 3100;
    } else if (distance < 8500) {
      startExplosion = 5800;
    } else if (distance < 11200) {
      startExplosion = 8500;
    } else if (distance < 13200) {
      startExplosion = 11200;
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
  
  relevant.triggerProjectile = function(distance) {
    var startProjectile = 11000;
    
    if (distance < 2960) {
      startProjectile = 800;
    } else if (distance < 5660) {
      startProjectile = 3500;
    } else if (distance < 8360) {
      startProjectile = 6200;
    } else if (distance < 11060) {
      startProjectile = 8900;
    } else if (distance < 13160) {
      startProjectile = 11000;
    }
    
    // duplicated function from relevant.onScroll
    function myCalc(animOrigin, animTrigger, animSpeed) {
      // animOrigin = Element offset
      // animTrigger = Position of variable "distance" when animation begins
      // animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
      animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
    }
    
    if ( distance >= (startProjectile + 2160) ) {
      this.$projectile.css('right', '480px');
    } else if ( distance >= startProjectile && distance < (startProjectile + 2160) ) {
      myCalc(-550,startProjectile,2);
      this.$projectile.css('right', animUpdate);
    } else {
      this.$projectile.css('right', '-550px');
    }
  }

  relevant.triggerSkill = function(distance) {
    var startSkill = this.sceneLength;
    var currentSkill = this.$skill1;
    var duration = 550; // How long the full opacity skill stays on the screen - in pixels.
    
    if (distance < 5660) {
      startSkill = 2960;
      currentSkill = this.$skill1;
    } else if (distance < 8360) {
      startSkill = 5660;
      currentSkill = this.$skill2;
    } else if (distance < 11060) {
      startSkill = 8360;
      currentSkill = this.$skill3;
    } else if (distance < 13160) {
      startSkill = 11060;
      currentSkill = this.$skill4;
    } else if (distance < this.sceneLength) {
      startSkill = 13160;
      currentSkill = this.$skill5;
    }
    
    // duplicated function from relevant.onScroll
    function myCalc(animOrigin, animTrigger, animSpeed) {
      // animOrigin = Element offset
      // animTrigger = Position of variable "distance" when animation begins
      // animSpeed = Pixels scrolled per pixels moved. 2 = 1px moved to 2px scrolled
      animUpdate = (distance - animTrigger)/animSpeed + animOrigin;
    }
        
    if ( distance < startSkill ) {
      this.$allSkills.css({'bottom': 0, 'opacity': 0});
    } else if ( distance >= startSkill && distance < (startSkill + 140) ) {
      myCalc(0,startSkill,10);
      currentSkill.css({'bottom': animUpdate, 'opacity': (animUpdate/14)});
    } else if ( distance >= (startSkill + 140) && distance <= (startSkill + 140 + duration) ) {
      currentSkill.css({'bottom': '14px', 'opacity': 1});
    } else if ( distance > (startSkill + 140 + duration) && distance <= (startSkill + 280 + duration) ) {
      myCalc(0,(startSkill + 140 + duration),1);
      currentSkill.css({'bottom': '14px', 'opacity': (1-(animUpdate/140))});
    } else {
      this.$allSkills.css({'bottom': '14px', 'opacity': 0});
    }
  }

  this.M.register(relevant);
})(jQuery);
