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
    this.sceneStarted = false;
    this.selectedMonth;
    this.selectedTimeline = "normal";
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

    this.animateMonths();
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

  flexible.animateMonths = function() {
    // hide stuff that may be active
    $(".quips div").hide();
    $(".activeAnimation").removeClass().hide();

    if (this.selectedTimeline === "normal") {
      var activeMonth = this.normalMonth;
      var $activeQuips = $("#normalQuips div");
    } else {
      var activeMonth = this.fastMonth;
      var $activeQuips = $("#fastQuips div");
    }

    $("#animations div")
      .stop()
      .delay("500")
      .eq(activeMonth)
        .addClass("activeAnimation")
        .show()
        .spriteIn();

    $activeQuips.stop().delay('1500').eq(activeMonth).fadeIn();
  };

  flexible.displayNormalTimeline = function() {
    if (this.selectedTimeline === "normal") {
      $(".activeAnimation").spriteOutAndBackIn();
      return false;
    }

    this.selectedTimeline = "normal";

    $('#normal').addClass('currentEnd');
    $('#normal-bg, #flag, #break4').animate({opacity: 1}, 500).removeClass('faded');
    $('#fast .bar').animate({height: '3px', bottom: '75px'}, 300);
    $('#animations').css({'margin-left': '359px', 'margin-top': '-132px'});

    this.animateMonths();
  };

  flexible.displayFastTimeline = function() {
    if (this.selectedTimeline === "fast") {
      $(".activeAnimation").spriteOutAndBackIn();
      return false;
    }

    this.selectedTimeline = "fast";

    $('#normal').removeClass();
    $('#normal-bg, #flag, #break4').animate({opacity: 0.35}, 500).addClass('faded');
    $('#fast .bar').animate({height: '7px', bottom: '73px'}, 300);
    $('#animations').css({'margin-left': '36px', 'margin-top': '-95px'});

    this.animateMonths();
  }

  flexible.onScroll = function(event) {
    this.conditionallyFixateScene();

    if (!this.sceneStarted && this.isFixated()) {
      this.sceneStarted = true;
      this.loadMonths();
    }
  };

  this.M.register(flexible);
})(jQuery);
