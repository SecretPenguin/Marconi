(function($) {
  var enroll = new Scene("enroll", 630);

  enroll.init = function() {
    this.$affordable = $("#affordable");
    this.$slider = $("#enroll-slider");
    this.$callToAction = $("#call-to-action");

    $("label").inFieldLabels();

    /* Validation */
    $("#requestForm").validate({
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

    $("#interestForm").validate({
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

    this.startSlider();

    $(document).on("preface.switch", $.proxy(this.syncSlider, this));
  };

  enroll.onScroll = function(event) {
    this.conditionallyFixateScene();

    // most scenes just need their container resized to fit the scene
    this.$container.height(this.sceneLength);
  };

  enroll.startSlider = function() {
    this.startingSlide = M.startingSlide || 0;

    this.$slider.cycle({
      fx: "fade",
      speedOut: 300,
      speedIn: 1100,
      timeout: 0,
      startingSlide: this.startingSlide,
      cleartypeNoBg: true
    });
  };

  enroll.syncSlider = function(event, context) {
    this.$slider.cycle(context);
    console.log("sync slider!", context);
  };

  this.M.register(enroll);
})(jQuery);
