(function($) {
  var flexible = new Scene("flexible", 400);

  flexible.init = function() {
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    this.months = [];
    this.normalMonth;
    this.fastMonth;
    this.$startMonth = $('#startMonth');

    // set up triggers
    $(window).on("scroll", $.proxy(this.onScroll, this));
    this.$startMonth.change($.proxy(this.loadMonths, this));
    $('#normalEnd, #normalMonth').click($.proxy(this.displayNormalTimeline, this));
    $('#fastEnd, #fastMonth').click($.proxy(this.displayFastTimeline, this));

    this.initMonthsArray();
    this.initMonthSelect();
    this.loadMonths();
  };

  flexible.initMonthsArray = function() {
    var date = new Date();

    for (var i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() + 1);
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
    $('#fastMonth').html(this.monthNames[this.fastMonth]);
    $('#normalMonth').html(this.monthNames[this.normalMonth]);

    this.loadMonthAssets();
    this.positionBreakImage(true);
  };

  flexible.loadMonthAssets = function() {
    // animate in the new end months
    var animationsDiv = $('#animations div');

    animationsDiv.hide();
    $('.quips div').hide();

    if ($('#normal').hasClass('currentEnd')) {
        animationsDiv.stop().delay('500').eq(this.normalMonth).fadeIn();
        $('#normalQuips div').stop().delay('500').eq(this.normalMonth).fadeIn();
    } else {
        animationsDiv.stop().delay('500').eq(this.fastMonth).fadeIn();
        $('#fastQuips div').stop().delay('500').eq(this.fastMonth).fadeIn();
    }
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
    $('#normal').animate({opacity: 1}, 500).addClass('currentEnd');
    $('#fast .bar').animate({height: '3px', bottom: '75px'}, 300);
    $('#animations').css('right', '0');
    this.loadMonthAssets();
  };

  flexible.displayFastTimeline = function() {
    $('#normal').animate({opacity: 0.35}, 500).removeClass();
    $('#fast .bar').animate({height: '7px', bottom: '73px'}, 300);
    $('#animations').css('right', '240px');
    this.loadMonthAssets();
  }

  flexible.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
  };

  flexible.onScroll = function(event) {
    var distance = this.distance();

    this.conditionallyFixateScene(distance);



    console.log(distance);
  };

  this.M.register(flexible);
})(jQuery);
