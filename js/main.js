$(document).ready(function(){
    // Slider for default home page
    ////////////////////////////////////////////////////////////
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        autoplay: true
    });
    
    // Portfolio
    ////////////////////////////////////////////////////////////
    $(function() {
        var selectedClass = "";
        var portfolioBtn = $(".portfolio-btn");
        
        portfolioBtn.on('click', function(e) {
            e.preventDefault();
            portfolioBtn.removeClass('active');
            selectedClass = $(this).attr("data-rel"); 
            $(".portfolio-items").fadeTo(100, 0.1);
            $(".portfolio-items .item").not("."+selectedClass).fadeOut();
            $(this).addClass('active');

            setTimeout(function() {
              $("."+selectedClass).fadeIn();
              $(".portfolio-items").fadeTo(800, 1);
            }, 400); 
        });
    });
    
    // Sticky menu when scroll
    ////////////////////////////////////////////////////////////
    $(window).scroll(function() {
        if($(window).scrollTop() > 200) {
            $('.navbar').addClass('fixed-top');
        }
        if($(window).scrollTop() < 200) {
            $('.navbar').removeClass('fixed-top');
        }
    });
    
    // Scroll to top
    ////////////////////////////////////////////////////////////
    $("a[href='#top']").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
    
    // Contact
    ////////////////////////////////////////////////////////////
    
    // Function for check if email valid
    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }

    // Contact Form
    $("#contactFormBtn").on('click', function(event){
        // cancels the form submission
        event.preventDefault();
        $('.error').hide();
        submitForm();
    });

    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();

        function isEmpty(str) {
            return (!str || 0 === str.length);
        }

        function validate() {
            var status;

            if(isEmpty(email) || !isValidEmailAddress(email)) {
                $('#email').after('<span class="error">Wrong input.</span>');
                status = false;
            }

            if(isEmpty(name)) {
                $('#name').after('<span class="error">Wrong input.</span>');
                status = false;
            }

            if(isEmpty(message)) {
                $('#message').after('<span class="error">Wrong input.</span>');
                status = false;
            }

            if(status === false) {
                return false;
            } else {
                return true;
            }
        }

        if(validate()) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: "name=" + name + "&email=" + email + "&message=" + message,
                success : function(text){
                    if (text == "success"){
                        formSuccess();
                    } else {
                        formError();
                    }
                }
            });
        }
    }

    // If Successed
    var name = $('#name');
    function formSuccess(){
        name.before('<p class="message-sent">Message sent successfully!</p>');
        $('.message-sent').delay(5000).fadeOut('slow');
    }

    // If Failed
    function formError(){
        name.before('<p class="message-not-sent">Message not sent!</p>');
        $('.message-not-sent').delay(5000).fadeOut('slow');
    }

});