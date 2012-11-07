(function($) {
  function between(x, min, max) {
    return min < x && x <= max;
  }

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
    this.$legs = $('#legs');
  };

  walking.onScroll = function(event) {
    this.calculateScrollSpeed();
    this.conditionallyFixateScene();

    // Animations!
    this.triggerExplosion();
    this.triggerProjectile();
    this.triggerSkill();

    var coinSprite = this.calculateSprite(50, 8);

    if (this.distance > 0) {
      M.setClassName(this.$projectile, "f" + coinSprite);
    }

    var bearSprite = this.calculateSprite(50, 18);
    var bearClass = "f" + bearSprite;

    // special considerations when at negative distance
    if (this.distance <= 0) {
      if (bearSprite === 0) {
        bearClass = "f0";
      } else {
        bearClass = "f" + (18 - bearSprite);
      }
    }

    if (between(this.distance, -650, 2650)) {
      bearClass += " s";
    } else if (between(this.distance, 2650, 3550)) {
      bearClass += " ss";
    } else if (between(this.distance, 3550, 5350)) {
      bearClass += " s";
    } else if (between(this.distance, 5350, 6250)) {
      bearClass += " sn";
    } else if (between(this.distance, 6250, 8050)) {
      bearClass += " n";
    } else if (between(this.distance, 8050, 8950)) {
      bearClass += " nn";
    } else if (between(this.distance, 8950, 10750)) {
      bearClass += " n";
    } else if (between(this.distance, 10750, 11650)) {
      bearClass += " np";
    } else if (between(this.distance, 11650, 13450)) {
      bearClass += " p";
    } else if (between(this.distance, 13450, 14350)) {
      bearClass += " pp";
    } else {
      bearClass += " p";
    }

    M.setClassName(this.$bear, bearClass);
    M.setClassName(this.$legs, bearClass);

    // screen traversal from left to right (start and end of scene)
    var newOffset;

    if (between(this.distance, -650, 1324)) {
      newOffset = this.calculateOffset(-650, -650, 2);
      this.$bear.css('left', newOffset);
    } else if (between(this.distance, 1324, 14300)) {
      this.$bear.css('left', '337px');
    } else if (this.distance > 14300) {
      newOffset = this.calculateOffset(337, 14300, 3);
      this.$bear.css('left', newOffset);
    } else {
      this.$bear.css('left', '-650px');
    }

    // Dev overlay -> Remove
    $('#cursprite').html(bearSprite);
  };

  walking.triggerExplosion = function() {
    var startExplosion = 13300;

    if (this.distance < 5800) {
      startExplosion = 3100;
    } else if (this.distance < 8500) {
      startExplosion = 5800;
    } else if (this.distance < 11200) {
      startExplosion = 8500;
    } else if (this.distance < 13300) {
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
