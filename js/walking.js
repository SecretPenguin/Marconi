(function($) {
  var walking = new Scene("walking", 16000);

  walking.init = function() {
    this.$explosion = $('#explosion');
    this.$projectile = $('#projectile');
    this.$allSkills = $('.skill');
    this.$skill1 = $('#skill1');
    this.$skill2 = $('#skill2');
    this.$skill3 = $('#skill3');
    this.$skill4 = $('#skill4');
    this.$skill5 = $('#skill5');
    this.$bear = $('#bear');
  };

  walking.onScroll = function(event) {
    this.calculateScrollSpeed();
    this.conditionallyFixateScene();

    // Animations!
    this.triggerExplosion();
    this.triggerProjectile();
    this.triggerSkill();

    var currentSprite = this.calculateSprite(50, 18);

    // Walking Sprite Update at Negative Distance
    if (this.distance <= 0 && this.distance >= -M.screenHeight) {
      switch(currentSprite) {
      case 0:
        M.setClassName(this.$bear, "f0");
        break;
      case 1:
        M.setClassName(this.$bear, "f17");
        break;
      case 2:
        M.setClassName(this.$bear, "f16");
        break;
      case 3:
        M.setClassName(this.$bear, "f15");
        break;
      case 4:
        M.setClassName(this.$bear, "f14");
        break;
      case 5:
        M.setClassName(this.$bear, "f13");
        break;
      case 6:
        M.setClassName(this.$bear, "f12");
        break;
      case 7:
        M.setClassName(this.$bear, "f11");
        break;
      case 8:
        M.setClassName(this.$bear, "f10");
        break;
      case 9:
        M.setClassName(this.$bear, "f9");
        break;
      case 10:
        M.setClassName(this.$bear, "f8");
        break;
      case 11:
        M.setClassName(this.$bear, "f7");
        break;
      case 12:
        M.setClassName(this.$bear, "f6");
        break;
      case 13:
        M.setClassName(this.$bear, "f5");
        break;
      case 14:
        M.setClassName(this.$bear, "f4");
        break;
      case 15:
        M.setClassName(this.$bear, "f3");
        break;
      case 16:
        M.setClassName(this.$bear, "f2");
        break;
      case 17:
        M.setClassName(this.$bear, "f1");
        break;
      }
    }

    // Walking Sprite Update
    if (this.distance <= this.$container.height() && this.distance > 0 ) {
      M.setClassName(this.$bear, "f" + currentSprite);
    }

    var coinSprite = this.calculateSprite(50, 8);

    // Coin Sprite
    if (this.distance <= this.$container.height() && this.distance > 0) {
      M.setClassName(this.$projectile, "f" + coinSprite);
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
		img1.src = "/images/walking/sprites/BearSprite-S.gif";
		img2.src = "/images/walking/sprites/BearSprite-SS.gif";
		img3.src = "/images/walking/sprites/BearSprite-SN.gif";
		img4.src = "/images/walking/sprites/BearSprite-N.gif";
		img5.src = "/images/walking/sprites/BearSprite-NN.gif";
		img6.src = "/images/walking/sprites/BearSprite-NP.gif";
		img7.src = "/images/walking/sprites/BearSprite-P.gif";
		img8.src = "/images/walking/sprites/BearSprite-PP.gif";
	  }
    if ( this.distance >= -650 && this.distance <= 2650 ) {
      this.$bear.css('background-image', 'url(' + img1.src + ')');
    } else if ( this.distance > 2650 && this.distance <= 3550 ) {
      this.$bear.css('background-image', 'url(' + img2.src + ')');
    } else if ( this.distance > 3550 && this.distance <= 5350 ) {
      this.$bear.css('background-image', 'url(' + img1.src + ')');
    } else if ( this.distance > 5350 && this.distance <= 6250 ) {
      this.$bear.css('background-image', 'url(' + img3.src + ')');
    } else if ( this.distance > 6250 && this.distance <= 8050 ) {
      this.$bear.css('background-image', 'url(' + img4.src + ')');
    } else if ( this.distance > 8050 && this.distance <= 8950 ) {
      this.$bear.css('background-image', 'url(' + img5.src + ')');
    } else if ( this.distance > 8950 && this.distance <= 10750 ) {
      this.$bear.css('background-image', 'url(' + img4.src + ')');
    } else if ( this.distance > 10750 && this.distance <= 11650 ) {
      this.$bear.css('background-image', 'url(' + img6.src + ')');
    } else if ( this.distance > 11650 && this.distance <= 13450 ) {
      this.$bear.css('background-image', 'url(' + img7.src + ')');
    } else if ( this.distance > 13450 && this.distance <= 14350 ) {
      this.$bear.css('background-image', 'url(' + img8.src + ')');
    } else {
      this.$bear.css('background-image', 'url(' + img7.src + ')');
    }

    // Walking Right
    var newOffset;
    if (this.distance >= -650 && this.distance < 1324) {
      newOffset = this.calculateOffset(-650, -650, 2);
      this.$bear.css('left', newOffset);
    } else if (this.distance >= 1324 && this.distance <= 14300) {
      this.$bear.css('left', '337px');
    } else if (this.distance > 14300) {
      newOffset = this.calculateOffset(337, 14300, 3);
      this.$bear.css('left', newOffset);
    } else {
      this.$bear.css('left', '-650px');
    }

    // Dev overlay -> Remove
    $('#cursprite').html(currentSprite);
  };

  walking.triggerExplosion = function() {
    var startExplosion = 13200;

    if (this.distance < 5800) {
      startExplosion = 3100;
    } else if (this.distance < 8500) {
      startExplosion = 5800;
    } else if (this.distance < 11200) {
      startExplosion = 8500;
    } else if (this.distance < 13200) {
      startExplosion = 11200;
    }

    // startExplosion = Distance to trigger animation
    if (this.distance >= startExplosion && this.distance <= startExplosion + 50) {
      M.setClassName(this.$explosion, "f0");
    } else if (this.distance > startExplosion + 50 && this.distance <= startExplosion + 100) {
      M.setClassName(this.$explosion, "f1");
    } else if (this.distance > startExplosion + 100 && this.distance <= startExplosion + 150) {
      M.setClassName(this.$explosion, "f2");
    } else if (this.distance > startExplosion + 150 && this.distance <= startExplosion + 200) {
      M.setClassName(this.$explosion, "f3");
    } else if (this.distance > startExplosion + 200 && this.distance <= startExplosion + 250) {
      M.setClassName(this.$explosion, "f4");
    } else {
      M.setClassName(this.$explosion, "hidden");
    }
  };

  walking.triggerProjectile = function() {
    var startProjectile = 11000;

    if (this.distance < 2960) {
      startProjectile = 800;
    } else if (this.distance < 5660) {
      startProjectile = 3500;
    } else if (this.distance < 8360) {
      startProjectile = 6200;
    } else if (this.distance < 11060) {
      startProjectile = 8900;
    } else if (this.distance < 13160) {
      startProjectile = 11000;
    }

    var newOffset;
    if (this.distance >= (startProjectile + 2160)) {
      this.$projectile.css('right', '480px');
    } else if ( this.distance >= startProjectile && this.distance < (startProjectile + 2160) ) {
      newOffset = this.calculateOffset(-550, startProjectile, 2);
      this.$projectile.css('right', newOffset);
    } else {
      this.$projectile.css('right', '-550px');
    }
  };

  walking.triggerSkill = function() {
    var startSkill = this.sceneLength;
    var currentSkill = this.$skill1;
    var duration = 550; // How long the full opacity skill stays on the screen - in pixels.

    if (this.distance < 5660) {
      startSkill = 2960;
      currentSkill = this.$skill1;
    } else if (this.distance < 8360) {
      startSkill = 5660;
      currentSkill = this.$skill2;
    } else if (this.distance < 11060) {
      startSkill = 8360;
      currentSkill = this.$skill3;
    } else if (this.distance < 13160) {
      startSkill = 11060;
      currentSkill = this.$skill4;
    } else {
      startSkill = 13160;
      currentSkill = this.$skill5;
    };

    var newOffset;
    if (this.distance < startSkill) {
      this.$allSkills.css({'bottom': 0, 'opacity': 0});
    } else if (this.distance >= startSkill && this.distance < (startSkill + 140)) {
      newOffset = this.calculateOffset(0, startSkill, 10);
      currentSkill.css({'bottom': newOffset, 'opacity': (newOffset/14)});
    } else if (this.distance >= (startSkill + 140) && this.distance <= (startSkill + 140 + duration)) {
      currentSkill.css({'bottom': '14px', 'opacity': 1});
    } else if ( this.distance > (startSkill + 140 + duration) && this.distance <= (startSkill + 280 + duration) ) {
      newOffset = this.calculateOffset(0, (startSkill + 140 + duration), 1);
      currentSkill.css({'bottom': '14px', 'opacity': (1-(newOffset/140))});
    } else {
      this.$allSkills.css({'bottom': '14px', 'opacity': 0});
    }
  };

  walking.calculateSprite = function(speed, count) {
    // speed = Pixels scrolled between sprite triggers
    // count = Number of sprites in animation
    return Math.abs((Math.ceil(this.distance / speed)) % count);
  };

  this.M.register(walking);
})(jQuery);
