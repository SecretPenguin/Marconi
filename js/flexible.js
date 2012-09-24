/*
(function($) {
  var mobile = new Scene("mobile", 400);

  mobile.init = function() {
    this.$switchButtons = $("#switchboard a");
    this.$devicesContainer = $("#devices");
    this.$devices = this.$devicesContainer.find("div");
    this.$slidersContainer = $("#sliders");
    this.$phoneSlider = $("#phoneSlider").remove();
    this.$tabletSlider = $("#tabletSlider").remove();
    this.$desktopSlider = $("#desktopSlider").remove();

    $(window).on("scroll", $.proxy(this.onScroll, this));
    this.$switchButtons.on("click", $.proxy(this.selectDevice, this));

    this.activateSlider("phone");
  };

  mobile.onResize = function(event) {
    this.$screen.height(M.screenHeight);
    this.$container.height(M.screenHeight + this.sceneLength);
  };

  mobile.onScroll = function(event) {
    var distance = this.distance();

    this.conditionallyFixateScene(distance);

    // Animate current device in when approaching scene
    var deviceSpeed = (distance / 2) + 146;
    if (distance < -292) {
      this.$devicesContainer.css("bottom", 0);
    } else if ( distance >= -292 && distance < 0 ) {
      this.$devicesContainer.css("bottom", deviceSpeed);
    } else if (distance >= 0) {
      this.$devicesContainer.css("bottom", 146);
    }

    console.log(distance);
  };

  mobile.selectDevice = function(event) {
    var $clicked = $(event.target);
    var thisEQ = $clicked.index();
    var $selected = this.$devices.eq(thisEQ);
    var selectedId = $selected.attr("id");

    this.$switchButtons.removeClass("current");
    $clicked.addClass("current");

    this.$devices.stop().css("z-index", 0).animate({top: 231}, 500, function() {
      $selected.stop().css("z-index", 10).animate({top: 0}, 500);
    });

    this.activateSlider(selectedId);
  };

  mobile.activateSlider = function(deviceId) {
    var slider = this["$"+deviceId+"Slider"].clone();
    this.$slidersContainer.animate({opacity: 0}, 800);
    this.$slidersContainer.html(slider);
    this.$slidersContainer.find("div").maximage({
      cycleOptions: {
        fx: "fade",
        speed: 800,
        timeout: 1000
      },
      cssBackgroundSize: false,
      cssTransitions: false
    });
    this.$slidersContainer.animate({opacity: 1}, 800);
  };

  this.M.register(mobile);
})(jQuery);
*/


/////////////////////
/////////////////////
/////////////////////

// Set monthNames and months arrays
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var date = new Date();
var months = [];
for (var i = 0; i < 12; i++) { 
	date.setMonth(date.getMonth() + 1);
	months.push(date.getMonth());
}

// Build select options
// Check this function - key?
var output = [];
$.each(months, function(key, value) {
  output.push('<option value="'+value+'">'+ monthNames[value] +'</option>');
});
$('#startMonth').html(output.join(''));

// Caclulate end months
function calcEndMonths() {
	curMonth = $('#startMonth option:selected').index();
	// Set accelerated program's end month
	fastMonth = months[((curMonth + 5)%12)];
	// Set normal program's end month
	normalMonth = months[((curMonth + 11)%12)];
}

// Display end months
function showEndMonths() {
	$('#fastMonth').html('Complete program by the end of ' + monthNames[fastMonth]);
	$('#normalMonth').html('Complete program by the end of ' + monthNames[normalMonth]);
}

// Trigger animation
function loadMonthAssets() {
	$('#animations div').hide();
	$('.quips div').hide();
	if ($('#normal').hasClass('currentEnd')) {
		$('#animations div').stop().delay('500').eq(normalMonth).fadeIn();
		$('#normalQuips div').stop().delay('500').eq(normalMonth).fadeIn();
	} else {
		$('#animations div').stop().delay('500').eq(fastMonth).fadeIn();
		$('#fastQuips div').stop().delay('500').eq(fastMonth).fadeIn();
	}
}

// Set break image position
function breaksImage(animate) {
	curVal = $('#startMonth option:selected').val();
	// Update variable to set scroll relative to later or earlier months selected
	curIndex = $('#startMonth option:selected').index();
	janIndex = $('#startMonth option:contains(January)').index();
	if (janIndex > curIndex) {
		updateBreak = -curVal*80 + 960;
	} else {
		updateBreak = -curVal*80;
	}
	// Set background image position
	if (animate == false) {
		$('#breaks').css('backgroundPosition', updateBreak + 'px center');
	} else {
		$('#breaks').animate({backgroundPosition: updateBreak + 'px center'}, 500);
	}
}

// Stuff to do on initial load
calcEndMonths();
loadMonthAssets();
showEndMonths();
breaksImage(false);

// Update months functions on change
$('#startMonth').change(function(){
	calcEndMonths();
	showEndMonths();
	breaksImage();
	loadMonthAssets();
});

// Display normal timeline
$('#normalEnd, #normalMonth').click(function(){
	$('#normal').animate({opacity: 1}, 500).addClass('currentEnd');
	$('#fast .bar').animate({height: '3px', bottom: '75px'}, 300);
	$('#animations').css('right', '0');
	loadMonthAssets();
});

// Display fast timeline
$('#fastEnd, #fastMonth').click(function(){
	$('#normal').animate({opacity: 0.35}, 500).removeClass();
	$('#fast .bar').animate({height: '7px', bottom: '73px'}, 300);
	$('#animations').css('right', '480px');
	loadMonthAssets();
});
