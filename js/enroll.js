(function($) {
  var enroll = new Scene("enroll", 1050);

  enroll.init = function() {
    this.$affordable = $('#affordable');
    this.$callToAction = $('#call-to-action');
    
    $('label').inFieldLabels();
    
	/* Validation */
	$('#requestForm').validate({
		errorPlacement: function(error,element) {
           return true;
        },
		rules: {
			required: "required",
			email: {
				required: true,
				email: true
			}
		}
	});
	
	$('#interestForm').validate({
		errorPlacement: function(error,element) {
           return true;
        },
		rules: {
			required: "required",
			email: {
				required: true,
				email: true
			}
		}
	});
	
	$(".selectOptions").selectbox();

  };

  enroll.onScroll = function(event) {
    this.conditionallyFixateScene();
    
    // most scenes just need their container resized to fit the scene
    this.$container.height(this.sceneLength);
  };
  
  this.M.register(enroll);
})(jQuery);
