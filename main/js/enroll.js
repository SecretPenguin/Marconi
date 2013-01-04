(function($) {
  var enroll = new Scene("enroll", 630);

  enroll.init = function() {
    this.$affordable = $("#affordable");
    this.$slider = $("#enroll-slider");
    this.$callToAction = $("#call-to-action");
    this.originalSceneLength = this.sceneLength;

    $("label").inFieldLabels();

    $("#requestForm, #interestForm").each(function() {
      $(this).validate({
        errorPlacement: function(error,element) {
         return true;
        },
        rules: {
          required: "required",
          email: {
            required: true,
            email: true
          }
        },
        submitHandler: function(form) {
          var $form = $(form);

          $.post($form.attr("action"), $form.serialize(), function(response) {
            $form.find(".thanks").show();
          });
        }
      })
    });

    $(".selectOptions").selectbox();

    this.startSlider();

    $(document).on("preface.switch", $.proxy(this.syncSlider, this));
  };

  enroll.onScroll = function(event) {
    this.conditionallyFixateScene();
  };

  enroll.onResize = function(event) {
    var viewportHeight = M.screenHeight - M.shareBarHeight();

    if (viewportHeight > this.originalSceneLength) {
      this.sceneLength = viewportHeight;
    } else {
      this.sceneLength = this.originalSceneLength;
    }

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
  };

  this.M.register(enroll);
})(jQuery);
