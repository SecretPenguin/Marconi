(function($) {
  var flexible = new Scene("flexible", 400);

  function MonthName(long, short) {
    this.long = long;
    this.short = short;
  };

  var monthNames = [
    new MonthName("January",   "JAN"),
    new MonthName("February",  "FEB"),
    new MonthName("March",     "MAR"),
    new MonthName("April",     "APR"),
    new MonthName("May",       "MAY"),
    new MonthName("June",      "JUN"),
    new MonthName("July",      "JUL"),
    new MonthName("August",    "AUG"),
    new MonthName("September", "SEP"),
    new MonthName("October",   "OCT"),
    new MonthName("November",  "NOV"),
    new MonthName("December",  "DEC")
  ];

  flexible.init = function() {
    this.months = [];
    this.selectedMonth;
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
    var options = $.map(this.months, function(value, key) {
      return '<option value="'+value+'">'+ monthNames[value].long +'</option>';
    }).join("");

    this.$startMonth.html(options);
  };

  flexible.selectedMonthPlus = function(offset) {
    return (this.selectedMonth + offset) % 12;
  };

  flexible.monthFromSelected = function(offset) {
    var adjustedOffset = (this.selectedMonth + offset) % 12;
    return this.months[adjustedOffset];
  }

  flexible.loadMonths = function() {
    this.selectedMonth = parseInt(this.$startMonth.val(), 10);

    // Set accelerated program's end month
    this.fastMonth = this.monthFromSelected(5);
    // Set normal program's end month
    this.normalMonth = this.monthFromSelected(11);

    // display end months
    this.$fastMonth.html(monthNames[this.fastMonth].short);
    this.$normalMonth.html(monthNames[this.normalMonth].short);

    // set breaks
    this.setBreaks();

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

  flexible.setBreaks = function() {
    $('.breaks').attr('class', 'breaks'); // Reset months

    var break1month = monthNames[this.monthFromSelected(2)].long;
    $('#break1').addClass('break'+break1month);

    var break2month = monthNames[this.monthFromSelected(5)].long;
    $('#break2').addClass('break'+break2month);

    var break3month = monthNames[this.selectedMonth].long;
    $('#break3').addClass('break'+break3month);

    var break4month = monthNames[this.monthFromSelected(9)].long;
    $('#break4').addClass('break'+break4month);
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
