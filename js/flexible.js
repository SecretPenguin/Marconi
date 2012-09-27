(function($) {
  var flexible = new Scene("flexible", 400);

  flexible.init = function() {
    

    $(window).on("scroll", $.proxy(this.onScroll, this));

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
    	$('#fastMonth').html(monthNames[fastMonth]);
    	$('#normalMonth').html(monthNames[normalMonth]);
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
    		updateBreak = -curVal*60 + 720;
    	} else {
    		updateBreak = -curVal*60;
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
    	$('#animations').css('right', '240px');
    	loadMonthAssets();
    });
  };

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
