(function($) {
  var flexible = new Scene("flexible", 400);

  flexible.init = function() {
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthNamesShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.months = [];
    this.normalMonth;
    this.fastMonth;
    this.$startMonth = $('#startMonth');
    this.$normalMonth = $('#normalMonth');
    this.$fastMonth = $('#fastMonth');
        
    // set up triggers
    this.$startMonth.change($.proxy(this.loadMonths, this));
    this.$normalMonth.click($.proxy(this.displayNormalTimeline, this));
    this.$fastMonth.click($.proxy(this.displayFastTimeline, this));

    this.initMonthsArray();
    this.initMonthSelect();
    this.loadMonths();
    
    $(".selectOptions").selectbox();
  };

  flexible.initMonthsArray = function() {
    var date = new Date();

    for (var i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() + 1, 1);
        this.months.push(date.getMonth());
    }
  };

  flexible.initMonthSelect = function() {
    var monthNames = this.monthNames;

    var options = $.map(this.months, function(value, key) {
      return '<option value="'+value+'">'+ monthNames[value] +'</option>';
    }).join("");

    this.$startMonth.html(options);
  };

  flexible.loadMonths = function() {
    var curMonth = $('#startMonth option:selected').index();
    // Set accelerated program's end month
    this.fastMonth = this.months[((curMonth + 5)%12)];
    // Set normal program's end month
    this.normalMonth = this.months[((curMonth + 11)%12)];

    // display end months
    this.$fastMonth.html(this.monthNamesShort[this.fastMonth]);
    this.$normalMonth.html(this.monthNamesShort[this.normalMonth]);
    
    // toggle months
    $('.endToggle a').mouseenter(function(){
      $(this).siblings('.toggleHover').stop().animate({'opacity': 1}, 250);
    }).mouseleave(function(){
      $(this).siblings('.toggleHover').stop().animate({'opacity': 0}, 250);
    });
    
    // fade flag on normal end date hover when early end date is selected
    this.$normalMonth.mouseenter(function(){
      $('#flag.faded').stop().animate({'opacity': 1}, 250);
    }).mouseleave(function(){
      $('#flag.faded').stop().animate({'opacity': .35}, 250);
    });

    this.loadMonthAssets();
    // this.positionBreakImage(true);
  };

  flexible.loadMonthAssets = function() {
    // animate in the new end months
    var animationsDiv = $('#animations div');

    animationsDiv.hide();
    $('.quips div').hide();

    if ($('#normal').hasClass('currentEnd')) {
        animationsDiv.stop().delay('500').eq(this.normalMonth).show()
        	.sprite({
        		fps: 5,
        		no_of_frames: 7,
        		start_at_frame: 1,
        		play_frames: 6,
        		on_last_frame: function(obj) {
        			obj.spStop(true);
        		}
        	});
        $('#normalQuips div').stop().delay('500').eq(this.normalMonth).fadeIn();
    } else {
        animationsDiv.stop().delay('500').eq(this.fastMonth).show()
        	.sprite({
        		fps: 5,
        		no_of_frames: 7,
        		start_at_frame: 1,
        		play_frames: 6,
        		on_last_frame: function(obj) {
        			obj.spStop(true);
        		}
        	});
        $('#fastQuips div').stop().delay('500').eq(this.fastMonth).fadeIn();
    }
    
    $('#startMonth, normalMonth, fastMonth').click(function(){
    	animationsDiv.spStart();
    });
  };

  flexible.positionBreakImage = function(animate) {
    var selected = this.$startMonth.find("option:selected");
    var curVal = selected.val();
    // Update variable to set scroll relative to later or earlier months selected
    var curIndex = selected.index();
    var janIndex = this.$startMonth.find('option:contains(January)').index();
    var updateBreak;

    if (janIndex > curIndex) {
        updateBreak = -curVal*60 + 720;
    } else {
        updateBreak = -curVal*60;
    }
    // Set background image position
    if (animate) {
      $('#breaks').animate({backgroundPosition: updateBreak + 'px center'}, 500);
    } else {
      $('#breaks').css('backgroundPosition', updateBreak + 'px center');
    }
  };

  flexible.displayNormalTimeline = function() {
    $('#normal').addClass('currentEnd')
    $('#normal-bg, #flag').animate({opacity: 1}, 500).removeClass('faded');
    $('#fast .bar').animate({height: '3px', bottom: '75px'}, 300);
    $('#animations').css({'margin-left': '359px', 'margin-top': '-132px'});
    this.loadMonthAssets();
  };

  flexible.displayFastTimeline = function() {
    $('#normal').removeClass();
    $('#normal-bg, #flag').animate({opacity: 0.35}, 500).addClass('faded');
    $('#fast .bar').animate({height: '7px', bottom: '73px'}, 300);
    $('#animations').css({'margin-left': '29px', 'margin-top': '-100px'});
    this.loadMonthAssets();
  }

  flexible.onScroll = function(event) {
    this.conditionallyFixateScene();
  };

  this.M.register(flexible);
})(jQuery);
