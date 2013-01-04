$(document).ready(function() {
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

    $("#requestForm").submit(function(event) {
      event.preventDefault();

      var $form = $(this);

      $.post($form.attr("action"), $form.serialize(), function(response) {
        $form.find(".thanks").show();
      });
    });
});
