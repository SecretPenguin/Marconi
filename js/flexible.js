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
    var selectedMonth = $('#startMonth option:selected').index();

    function selectedMonthPlus(offset) {
      return (selectedMonth + offset) % 12;
    };

    // Set accelerated program's end month
    this.fastMonth = this.months[selectedMonthPlus(5)];
    // Set normal program's end month
    this.normalMonth = this.months[selectedMonthPlus(11)];

    // display end months
    this.$fastMonth.html(this.monthNamesShort[this.fastMonth]);
    this.$normalMonth.html(this.monthNamesShort[this.normalMonth]);

    // set breaks
    $('.breaks').attr('class', 'breaks'); // Reset months
    var break1month = this.monthNames[this.months[selectedMonthPlus(2)]];
    $('#break1').addClass('break'+break1month);
    var break2month = this.monthNames[this.months[selectedMonthPlus(5)]];
    $('#break2').addClass('break'+break2month);
    var break3month = this.monthNames[this.months[selectedMonth]];
    $('#break3').addClass('break'+break3month);
    var break4month = this.monthNames[this.months[selectedMonthPlus(9)]];
    $('#break4').addClass('break'+break4month);

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
  };

  flexible.loadMonthAssets = function() {
    // animate in the new end months
    var animationsDiv = $('#animations div');

    // exit animation (should probably move this - just testing)
    // previously simply hid all animations before triggering new one
    $('.activeAnimation').stop().sprite({
      fps: 10,
      no_of_frames: 19,
      start_at_frame: 13, // this doesn't seem to affect anything once it's already been set
      play_frames: 6
    }).delay(500).hide().removeClass();

    $('.quips div').hide();

    if ($('#normal').hasClass('currentEnd')) {
      animationsDiv.stop().delay('500').eq(this.normalMonth).addClass('activeAnimation').show()
        .sprite({
          fps: 10,
          no_of_frames: 19,
          start_at_frame: 1,
          play_frames: 13
        });
      $('#normalQuips div').stop().delay('1500').eq(this.normalMonth).fadeIn();
    } else {
      animationsDiv.stop().delay('500').eq(this.fastMonth).addClass('activeAnimation').show()
        .sprite({
          fps: 10,
          no_of_frames: 19,
          start_at_frame: 1,
          play_frames: 13
        });
      $('#fastQuips div').stop().delay('1500').eq(this.fastMonth).fadeIn();
    }
  };

  flexible.displayNormalTimeline = function() {
    $('#normal').addClass('currentEnd');
    $('#normal-bg, #flag, #break4').animate({opacity: 1}, 500).removeClass('faded');
    $('#fast .bar').animate({height: '3px', bottom: '75px'}, 300);
    $('#animations').css({'margin-left': '359px', 'margin-top': '-132px'});
    this.loadMonthAssets();
  };

  flexible.displayFastTimeline = function() {
    $('#normal').removeClass();
    $('#normal-bg, #flag, #break4').animate({opacity: 0.35}, 500).addClass('faded');
    $('#fast .bar').animate({height: '7px', bottom: '73px'}, 300);
    $('#animations').css({'margin-left': '36px', 'margin-top': '-95px'});
    this.loadMonthAssets();
  }

  flexible.onScroll = function(event) {
    this.conditionallyFixateScene();
  };

  this.M.register(flexible);
})(jQuery);
