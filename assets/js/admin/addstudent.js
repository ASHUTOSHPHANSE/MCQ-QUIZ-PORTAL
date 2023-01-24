$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstname: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please enter First Name'
                    }
                }
            },
            lastname: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please enter First Name'
                    }
                }
            },
			 username: {
                validators: {
                     stringLength: {
                        min: 5,
                    },
                    notEmpty: {
                        message: 'Please enter Username'
                    }
                }
            },
			 password: {
                validators: {
                     stringLength: {
                        min: 5,
                    },
                    notEmpty: {
                        message: 'Please enter Password'
                    }
                }
            },
			// confirmpassword: {
            //     validators: {
            //          stringLength: {
            //             min: 8,
            //         },
            //         notEmpty: {
            //             message: 'Please confirm Password'
            //         }
            //     }
            // },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter Email Address'
                    },
                    emailAddress: {
                        message: 'Please enter a valid Email Address'
                    }
                }
            },
            contact: {
                validators: {
                  stringLength: {
                        min: 10, 
                        max: 10,
                    notEmpty: {
                        message: 'Please enter Contact No.'
                     }
                }
            },
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            // $.post($form.attr('action'), $form.serialize(), function(result) {
            //     console.log(result);
            // }, 'json');
        });
});