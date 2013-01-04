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
      },
      submitHandler: function(form) {
        var $form = $(form);

        $.post($form.attr("action"), $form.serialize(), function(response) {
          $form.find(".thanks").show();
        });
      }
    });
});
