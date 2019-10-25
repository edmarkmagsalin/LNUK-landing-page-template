$(document).ready(function () {

    /*change the dropdown placeholder color to gray by default and change it to black when an item is selected - Gad*/
    $("select[name='salutation']").css("color","#868e96");
    $("select[name='What_can_we_help_you_with__c']").css("color","#868e96");
    $("select[name='Country__c']").css("color","#868e96");
    $("select[name='Product_you_are__c']").css("color","#868e96");
    $("select[name='Practice_Area_APIL__c']").css("color","#868e96");
    $("select[name='Area_of_Interest__c']").css("color","#868e96");

    $("select[id='salutation']").bind("focus click", function(){
        var salutation = $("select[id='salutation']");
        changeColor(salutation);
    });

    $("select[name='What_can_we_help_you_with__c']").bind("focus click", function(){
        var what_can_we_help = $("select[name='What_can_we_help_you_with__c']");
        changeColor(what_can_we_help);
    });

    $("select[name='Country__c']").bind("focus click", function(){
        var country = $("select[name='Country__c']");
        changeColor(country);
    });

    $("select[name='Product_you_are__c']").bind("focus click", function(){
        var product = $("select[name='Product_you_are__c']");
        changeColor(product);
    });

    $("select[name='Practice_Area_APIL__c']").bind("focus click", function(){
        var practice_area = $("select[name='Practice_Area_APIL__c']");
        changeColor(practice_area);
    });

    $("select[name='Area_of_Interest__c']").bind("focus click", function(){
        var area_of_interest = $("select[name='Area_of_Interest__c']");
        changeColor(area_of_interest);
    });

    $("input[name='Number_of_fee_earners__c']").bind("keypress keyup blur", function (e) {
        var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());

        if (isAndroid) {
            phoneForm($(this))
        }
        var inp = String.fromCharCode(e.keyCode);
        if (/[^0-9]/.test(inp)) {
            phoneForm($(this))
        }
    }).each(function () {
        if ($(this).val().length > 0) {
            phoneForm($(this))
        }
    });


    $("input[id='phone']").bind("keypress keyup blur", function (e) {
        var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());

        if (isAndroid) {
            phoneForm($(this))
        }
        var inp = String.fromCharCode(e.keyCode);
        if (/[^0-9]/.test(inp)) {
            phoneForm($(this))
        }
    }).each(function () {
        if ($(this).val().length > 0) {
            phoneForm($(this))
        }
    });

    $("input[id='first_name']").bind("keypress keyup blur", function(e){
        var inp = String.fromCharCode(e.keyCode);
        if(/[0-9]/.test(inp)) {
            removeNumber($(this));
        }
    });

    $("input[id='last_name']").bind("keypress keyup blur", function(e){
        var inp = String.fromCharCode(e.keyCode);
        if(/[0-9]/.test(inp)) {
            removeNumber($(this));
        }
    });


    /*keypress functions*/
    $("#salutation").bind("focusout", function(){
        var salutation = $("#salutation");
        validateReqDropdown(salutation);
    });

    $("input[id='first_name']").bind("focusout", function(){
        var first_name_field = $("input[id='first_name']");
        validateNameField(first_name_field); 
        
    });

    $("input[id='last_name']").bind("focusout", function(){
        var last_name_field = $("input[id='last_name']");
        validateNameField(last_name_field);
    });

    $("input[id='company']").bind("focusout", function(){
        var company_field = $("input[id='company']");
        validateField(company_field);
    });

    $("input[id='title']").bind("focusout", function(){
        var job_title = $("input[id='title']");
        validateField(job_title);
    });

    $("select[name='What_can_we_help_you_with__c']").bind("focusout", function(){
        var what_can_we_help = $("select[name='What_can_we_help_you_with__c']");
        validateDropdown(what_can_we_help);
    });

    $("select[name='Area_of_Interest__c']").bind("focusout", function(){
        var area_of_interest = $("select[name='Area_of_Interest__c']");
        validateDropdown(area_of_interest);
    });

    /*added a click event listener for real time PA validation - Gad*/

    $("select[name='Practice_Area_APIL__c']").bind("focusout click", function(){
        var practice_area = $("select[name='Practice_Area_APIL__c']");
     
        /* DO NOT DELETE */
        /* This is to apply to all free trial forms - JD */

        var productname = $("input[name='Product_you_are__c']").val();

        if ((productname == "LexisPSL" || productname == "LexisLibrary" || productname == "LexisLibrary - Halsburys Trial" || productname == "LexisLibrary Jordan Publishing") && $('form').hasClass('freetrial') ) {
            validatePADropdown(practice_area);
        }
        else {
            validateDropdown(practice_area); 
        }

    });

    $("input[id='phone']").bind("focusout", function(){
        var phone_field = $("input[id='phone']");
        
        if ($("select[name='Country__c']").val() == "United Kingdom") {
            validateMobileNumber(phone_field);
        }
        else {
            validatePhone(phone_field);
        }

    });

    $("input[id='email']").bind("focusout", function(){
        var email_field = $("input[id='email']");
        validateEmailField(email_field);
    });

    $("input[name='Postcode__c']").bind("focusout", function(){
        var postcode_field = $("input[name='Postcode__c']");
        validateField(postcode_field);
    });

    $("select[name='Country__c']").bind("focusout", function(){
        var country = $("select[name='Country__c']");
        validateReqDropdown(country);
    });

    $("select[name='Product_you_are__c']").bind("focusout", function(){
        var product = $("select[name='Product_you_are__c']");
        validateDropdown(product);
    });

    $("input[name='Account_Number__c']").bind("focusout", function(){
        var account_number = $("input[name='Account_Number__c']");
        validateNotReqField(account_number);
    });

    $("input[name='Account_Manager__c']").bind("focusout", function(){
        var account_manager = $("input[name='Account_Manager__c']");
        validateNotReqField(account_manager);
    });

    $("input[name='Number_of_fee_earners__c']").bind("focusout", function(){
        var sr_number = $("input[name='Number_of_fee_earners__c']");
        validateField(sr_number);
    });

    /* Tooltip Initialization */
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
});

/* Hide tooltip on mobile and tablet devices */
$(window).on('resize', function(){
      hideTooltip();
});
function hideTooltip() {
    if ( $(window).width() < 780 ){
        $('.form-group input, .form-group select').tooltip('disable');
    }   
    else {
        $('.form-group input, .form-group select').tooltip('enable');
    }
}

/* Validation Code */
function Validate(){

    var count = 0, check = false;

    // validate all .req : BEGIN
    $('.req').each(function() {
        
        //for both MC and SF
        //check if empty
        if ($(this).val().length == 0 || $(this).val() == "None") {

            $(this).removeClass("pass");
            $(this).parent('.form-group').removeClass("form-pass");
            $(this).addClass("err");
            $(this).parent('.form-group').addClass("form-err");
            $(this).parent('.form-group').find("label").addClass("ic-err");

            if (!$(this).next().hasClass('errMsg')) {
                $(this).parent('.form-group').append('<div class="errMsg"><p>This field is required.</p></div>');
            }
            count++;
        }


        //for both MC and SF
        //if salutation field is none
        else if ($(this).val() == 'None' && $(this).attr('id') == 'salutation') {
            if (!$(this).next().hasClass('errMsg')) {
                $(this).parent('.form-group').append('<div class="errMsg"><p>This field is required.</p></div>');
            }
            count++;
        }
        else if ($(this).next().hasClass('errMsg') && $(this).val() != 'None') {
            $(this).next().remove();
        }

        else if ($(this).val() != "None" && $(this).attr('id') == 'Country__c') {
            $(this).removeClass("err");
            $(this).parent('.form-group').removeClass("form-err");
            $(this).parent('.form-group').addClass("form-pass");
            $(this).addClass("pass");
            if ($(this).val() == "United States of America" && $('form').hasClass('freetrial')) {
                console.log("true");
                if ($(this).next().hasClass('errMsg')) {
                    $(this).next().find('p').html('Looking for US legislation, case law and practical guidance? <a href="https://www.lexisnexis.com/en-us/products/lexis-advance.page" target="_blank">Please click here.</a>');
                } else if (!$(this).next().hasClass('errMsg')) {
                    $(this).parent('.form-group').append('<div class="errMsg"><p>Looking for US legislation, case law and practical guidance? <a href="https://www.lexisnexis.com/en-us/products/lexis-advance.page" target="_blank">Please click here.</a></p></div>');
                }
                $(this).next('.errMsg').css("color", "#0c5fca");
                $(this).next('.errMsg').css("background-color", "#cce5ff");
            }
            else { 
                console.log("false");
                $(this).next().remove();
            }
            $(this).parent('.form-group').find("label").removeClass("ic-err");
            $(this).parent('.form-group').find("label").addClass("ic-pass");

        }

        //for both MC and SF
        //if first name is empty and contain number
        else if ($(this).val().length != 0 && $(this).attr('id') == 'first_name') {
            if ($(this).next().hasClass('errMsg') && !/^[a-zA-Z() ]+$/.test($(this).val())) {
                $(this).next().find('span').html('Please do not enter numbers.');
                count++;

            }
            else if ($(this).next().hasClass('errMsg') && /^[a-zA-Z() ]+$/.test($(this).val())) {
                $(this).next().remove();
            }

        }
        
        //for both MC and SF
        //if last name is empty and contain number
        else if ($(this).val().length != 0 && $(this).attr('id') == 'last_name') {
            if ($(this).next().hasClass('errMsg') && !/^[a-zA-Z() ]+$/.test($(this).val())) {
                $(this).next().find('span').html('Please do not enter numbers.');
                count++;
            } else if ($(this).next().hasClass('errMsg') && /^[a-zA-Z() ]+$/.test($(this).val())) {
                $(this).next().remove();
            }

        }

        //for both MC and SF
        else if ($(this).val().length != 0 && $(this).attr('id') == 'company') {
            $(this).next().remove();
        }

        //for both MC and SF
        else if ($(this).val().length != 0 && $(this).attr('id') == 'title') {
            if ($(this).next().hasClass('errMsg')) {
                $(this).next().remove();
            }
        }
        
        else if ($(this).val().length != 0 && $(this).attr('id') == 'phone') {
            if ($(this).next().hasClass('errMsg') && $(this).val().length <= 5 && !$.isNumeric($(this).val())) {
                $(this).next().find('span').html('Numbers only.');
                count++;
            } else if ($(this).next().hasClass('errMsg') && $(this).val().length <= 5 && $.isNumeric($(this).val())) {
                $(this).next().find('span').html('Phone number is too short.');
                count++;
            } else if (!$(this).next().hasClass('errMsg') && $(this).val().length <= 5 && $.isNumeric($(this).val())) {
                $(this).parent('.form-group').append('<div class="errMsg"><p>Phone number is too short.</p></div>');
                count++;
            } else if (!$(this).next().hasClass('errMsg') && $(this).val().length <= 5 && !$.isNumeric($(this).val())) {
                $(this).parent('.form-group').append('<div class="errMsg"><p>Numbers only</p></div>');
                count++;
            } else if (!$(this).next().hasClass('errMsg') && $(this).val().length <= 5 && !$.isNumeric($(this).val())) {
                $(this).parent('.form-group').append('<div class="errMsg"><p>Numbers only</p></div>');
                count++;
            } else if (!$(this).next().hasClass('errMsg') && $(this).val().length > 5 && !$.isNumeric($(this).val())) {
                $(this).parent('.form-group').append('<div class="errMsg"><p>Numbers only</p></div>');
                count++;
            } else if ($(this).next().hasClass('errMsg') && $(this).val().length > 5 && !$.isNumeric($(this).val())) {
                $(this).next().find('span').html('Numbers only');
                count++;
            } else if ($(this).next().hasClass('errMsg') && $(this).val().length > 5 && $.isNumeric($(this).val())) {
                $(this).next().remove();
            }
        }

        else if ($(this).val().length != 0 && $(this).attr('id') == 'email') {
            if(!checkEmail($(this).val(), this)) {
                count++;
            }
            else if ($(this).next().hasClass('errMsg') && checkEmail($(this).val())) {
                $(this).next().remove();
            }
        }

        else if ($(this).val().length != 0 && $(this).hasClass('postal')) {
            $(this).removeClass("err");
            $(this).parent('.form-group').removeClass("form-err");
            $(this).parent('.form-group').addClass("form-pass");
            $(this).addClass("pass");
            $(this).next().remove();
            $(this).parent('.form-group').find("label").removeClass("ic-err");
            $(this).parent('.form-group').find("label").addClass("ic-pass");
        }
        
        else if ($(this).attr('type') == 'checkbox' && $(this).prop('checked') == false) {

            $(this).addClass("err");
            /*$(this).parent('.form-group').addClass("form-err"); disabled because it is overlapping in the tickbox*/

            if (!$(this).next().next().hasClass('errMsg') && $(this).prop('checked') == false) {
                $(this).parent('.form-group').append('<div class="errMsg"><p>Please confirm checkbox.</p></div>');
                count++;
            } else if ($(this).next().next().hasClass('errMsg') && $(this).prop('checked') == false) {
                count++;
            }

        }

        if ($(this).type =='checkbox') {
            check == true;
        }

    });
    // validate all .req : END

    $('.req').each(function() {
        if ($(this).val().length == 0 || $(this).val() == "None") {
            $(this).focus();
            return false;
        } else if (($(this).val().length != 0 || $(this).val() != "None") && $(this).next().hasClass('errMsg') && $(this).hasClass('err') ) {
            $(this).focus();
            return false;
        }
    });


    if (count != 0 | check=="false"){

        // if the alert box is not yet existing
        if (!$(".wFormContainer .errAlert").length > 0) {
            $(".wFormContainer").prepend('<div class="alert alert-danger errAlert" role="alert"><p><strong>The form is not complete and has not been submitted yet.<br>There are '+ count +' problems with your submission.</strong></p></div>');
        }

        // if the alert box is existing
        else if($(".wFormContainer .errAlert").length > 0) {
            $(".errAlert").find('p').html('The form is not complete and has not been submitted yet.<br>There are '+ count +' problems with your submission.');
        }

        // if MC form, use alert for error message
        if ($('#form').attr('action') == "https://cl.s7.exct.net/DEManager.aspx"){
            alert("The form is not complete and has not been submitted yet.\nThere are "+ count +" problems with your submission.");
        }

        console.log("false")
        return false;
    }
    else{
        console.log("true")
        return true;
    }

}

function validateEmailField(input_field){
    
    if(input_field.val().length == 0) {

        input_field.removeClass("pass");
        input_field.addClass("err");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').addClass("form-err");
        input_field.parent('.form-group').find('label').removeClass('ic-pass');
        input_field.parent('.form-group').find('label').addClass('ic-err');

        if (!input_field.next().hasClass('errMsg')) {
                input_field.parent('.form-group').append('<div class="errMsg"><p>This field is required.</p></div>');
        }

        else if(input_field.next().hasClass('errMsg')) {
                input_field.next().find('p').html('This field is required.');
        }

        $('#email').next('.errMsg').css("color", "");

    }

    else {
        checkEmail(input_field.val());
    }
}

function checkEmail(str, i) {
    var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,5}|[0-9]{1,3})(\]?)$/;
    var public_email = /^[A-Za-z0-9._%+-]+@(gmail.com|hotmail.com|hotmail.co.uk|yahoo.com|yahoo.co.uk|outlook.com|btinternet.com|aol.com|live.co.uk|icloud.com|googlemail.com|me.com|sky.com|live.com|msn.com|ymail.com|btconnect.com|qq.com|aol.co.uk|ntlworld.com|mail.com|mac.com|mail.ru|linklaters.com|btopenworld.com|talktalk.net|mailinator.com|mvrht.net|gmx.com|)$/;
    if (re.test(str)) {

        if(public_email.test(str)) {
            if ($('#email').next().hasClass('errMsg')) {
                $('#email').next().find('p').html('It looks like you may have used a personal email address.<br>Please ensure the email you have entered is the one you use for work.');
            } else if (!$('#email').next().hasClass('errMsg')) {
                $('#email').parent('.form-group').append('<div class="errMsg"><p>It looks like you may have used a personal email address.<br>Please ensure the email you have entered is the one you use for work.</p></div>');
            }
            $('#email').removeClass("err");
            $('#email').addClass("pass");
            $('#email').parent('.form-group').removeClass("form-err");
            $('#email').parent('.form-group').addClass("form-pass");
            $('#email').next('.errMsg').css("color", "green");
            $('#email').parent('.form-group').find('label').removeClass('ic-err');
            $('#email').parent('.form-group').find('label').addClass('ic-pass');
            return true;
        }

        else {
            $('#email').removeClass("err");
            $('#email').addClass("pass");
            $('#email').parent('.form-group').removeClass("form-err");
            $('#email').parent('.form-group').addClass("form-pass");
            $('#email').next().remove();
            $('#email').parent('.form-group').find('label').removeClass('ic-err');
            $('#email').parent('.form-group').find('label').addClass('ic-pass');
            return true;
        }
        
    } 

    else {
        $('#email').removeClass("pass");
        $('#email').addClass("err");
        $('#email').parent('.form-group').removeClass("form-pass");
        $('#email').parent('.form-group').addClass("form-err");
        $('#email').parent('.form-group').find('label').addClass('ic-err');

        if ($('#email').next().hasClass('errMsg')) {
            $('#email').next().find('p').html('Your email address is invalid.');
        } else if (!$('#email').next().hasClass('errMsg')) {
            $('#email').parent('.form-group').append('<div class="errMsg"><p>Your email address is invalid.</p></div>');
        }

        $('#email').next('.errMsg').css("color", "");
        return false;
    }
}




function validateMobileNumber(input_field){
    
    if(input_field.val().length == 0) {

        input_field.removeClass("warn");
        input_field.parent('.form-group').removeClass("form-warn");

        input_field.removeClass("pass");
        input_field.addClass("err");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').addClass("form-err");
        input_field.parent('.form-group').find('label').removeClass('ic-pass');
        input_field.parent('.form-group').find('label').addClass('ic-err');

        if (input_field.parent('.form-group').find('.errMsg').length == 0) {
                input_field.parent('.form-group').append('<div class="errMsg"><p>This field is required.</p></div>');
        }

        else if(input_field.parent('.form-group').find('.errMsg').length !== 0) {
                input_field.parent('.form-group').find('.errMsg').find('p').html('This field is required.');
        }

        input_field.next('.errMsg').css("color", "#ed1c24");

    }

    else {
        checkMobileNumber(input_field.val());
    }
}

function checkMobileNumber(str) {
    var firstTwoNum = /^07.*$/;
    var tooLong = /^07[0-9]{10,}$/;
    var finalCheck = /^07[0-9]{9}$/;

    $('#phone').removeClass("warn");
    $('#phone').parent('.form-group').removeClass("form-warn");

    if (firstTwoNum.test(str)) {

        if(tooLong.test(str)){
            $('#phone').removeClass("pass");
            $('#phone').addClass("err");
            $('#phone').parent('.form-group').removeClass("form-pass");
            $('#phone').parent('.form-group').addClass("form-err");
            $('#phone').parent('.form-group').find('label').addClass('ic-err'); 

            if ($('#phone').parent('.form-group').find('.errMsg').length !== 0) {
                $('#phone').parent('.form-group').find('.errMsg').find('p').html('The mobile number is too long.');
            } else if($('#phone').parent('.form-group').find('.errMsg').length == 0) {
                $('#phone').parent('.form-group').append('<div class="errMsg"><p>The mobile number is too long.</p></div>');
            }
            $('#phone').next('.errMsg').css("color", "#ed1c24");
            return false;
        }

        else if(finalCheck.test(str)) {
            $('#phone').removeClass("err");
            $('#phone').parent('.form-group').find('.errMsg').remove();
            $('#phone').parent('.form-group').removeClass("form-err");
            $('#phone').parent('.form-group').addClass("form-pass");
            $('#phone').addClass("pass");
            $('#phone').parent('.form-group').find('label').removeClass('ic-err');
            $('#phone').parent('.form-group').find('label').addClass('ic-pass');
            return true;
        }

        else {
            $('#phone').removeClass("pass");
            $('#phone').addClass("err");
            $('#phone').parent('.form-group').removeClass("form-pass");
            $('#phone').parent('.form-group').addClass("form-err");
            $('#phone').parent('.form-group').find('label').addClass('ic-err'); 

            if ($('#phone').parent('.form-group').find('.errMsg').length !== 0) {
                $('#phone').parent('.form-group').find('.errMsg').find('p').html('The mobile number is too short.');
            } else if($('#phone').parent('.form-group').find('.errMsg').length == 0) {
                $('#phone').parent('.form-group').append('<div class="errMsg"><p>The mobile number is too short.</p></div>');
            }
            $('#phone').next('.errMsg').css("color", "#ed1c24");
            return false;
        }
        
    } 

    else {
        $('#phone').removeClass("pass");
        $('#phone').parent('.form-group').removeClass("form-pass");

        $('#phone').removeClass("err");
        $('#phone').parent('.form-group').removeClass("form-err");

        $('#phone').addClass("warn");
        $('#phone').parent('.form-group').addClass("form-warn");
        

        if ($('#phone').parent('.form-group').find('.errMsg').length !== 0) {
            $('#phone').parent('.form-group').find('.errMsg').find('p').html('Check that this is a UK Mobile (starting 07) - we SMS your login credentials to you.');
        } else if($('#phone').parent('.form-group').find('.errMsg').length == 0) {
            $('#phone').parent('.form-group').append('<div class="errMsg"><p>Check that this is a UK Mobile (starting 07) - we SMS your login credentials to you.</p></div>');
        }
        $('#phone').next('.errMsg').css("color", "coral");
        return true;
    }
}


function phoneForm(i) {
    var realnum = i.val().replace(/[^0-9]/g, '');
    i.val(realnum);
}

function validateField(input_field){

    if(input_field.val().length == 0) {

        input_field.removeClass("pass");
        input_field.addClass("err");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').addClass("form-err");
        input_field.parent('.form-group').find('label').removeClass('ic-pass');
        input_field.parent('.form-group').find('label').addClass('ic-err');

        if (!input_field.next().hasClass('errMsg')) {
                input_field.parent('.form-group').append('<div class="errMsg"><p>This field is required.</p></div>');
        }

        else if(input_field.next().hasClass('errMsg')) {
                input_field.next().find('p').html('This field is required.');
        }
    }

    else {
        input_field.removeClass("err");
        input_field.parent('.form-group').removeClass("form-err");
        input_field.parent('.form-group').addClass("form-pass");
        input_field.addClass("pass");
        input_field.next().remove();
        input_field.parent('.form-group').find('label').removeClass('ic-err');
        input_field.parent('.form-group').find('label').addClass('ic-pass');
    }
}

function validateJTField(input_field){

    if(input_field.val().length != 0) {
        input_field.addClass("pass");
        input_field.parent('.form-group').addClass("form-pass");
        input_field.parent('.form-group').find('label').addClass('ic-pass');
    }

    else {
        input_field.removeClass("pass");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').find('label').removeClass('ic-pass');
    }
}

function validateNotReqField(input_field){

    if(input_field.val().length != 0) {
        input_field.addClass("pass");
        input_field.parent('.form-group').addClass("form-pass");
        input_field.parent('.form-group').find('label').addClass('ic-pass');
    }

    else {
        input_field.removeClass("pass");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').find('label').removeClass('ic-pass');
    }
}

function validateDropdown(input_field){

    if(input_field.val() == "None") {
        input_field.removeClass("pass");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').find('label').removeClass('ic-pass');
    }

    else {
        input_field.addClass("pass");
        input_field.parent('.form-group').addClass("form-pass");
        input_field.parent('.form-group').find('label').addClass('ic-pass');
    }
}

/*validation for PA dropdown if the product offered is LexisPSL - Gad*/
function validatePADropdown(input_field){

    if(input_field.val() == "None") {
        input_field.removeClass("pass");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').find('label').removeClass('ic-pass');
        if (input_field.next().hasClass('errMsg')) {
            input_field.next().remove();
        }
        if (input_field.parent('.form-group').hasClass('form-info')) {
            input_field.parent('.form-group').removeClass("form-info");
        }
    }

    else if(input_field.val() == "Practice Management" || input_field.val() == "Practice Compliance" || input_field.val() == "Risk & Compliance"){
        console.log("Free trial is not available, click below and one of our sales team will get in touch with you to setup a demo for this practice area.");
        if (!input_field.next().hasClass('errMsg')) {
            input_field.parent('.form-group').append('<div class="errMsg"><p>Sorry, we do not offer a free trial for this practice area but please click the red button below and we will call you to arrange a demo.</p></div>');
        }
        else if(input_field.next().hasClass('errMsg')) {
            input_field.next().find('p').html('Sorry, we do not offer a free trial for this practice area but please click the red button below and we will call you to arrange a demo.');
        }
        /*added a blue background color for PA information - Gad*/
        input_field.next('.errMsg').css("color", "#0c5fca");
        input_field.next('.errMsg').css("background-color", "#cce5ff");
        input_field.parent('.form-group').addClass("form-info");

    }
    else {
        input_field.parent('.form-group').removeClass("form-info");
        input_field.addClass("pass");       
        input_field.parent('.form-group').addClass("form-pass");
        input_field.parent('.form-group').find('label').addClass('ic-pass');
        input_field.next().remove();
    }
}

function validateNameField(input_field) {
    if(input_field.val().length == 0) {
        input_field.removeClass("pass");
        input_field.addClass("err");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').addClass("form-err");
        input_field.parent('.form-group').find('label').removeClass('ic-pass');
        input_field.parent('.form-group').find('label').addClass('ic-err');

        if (!input_field.next().hasClass('errMsg')) {
            input_field.parent('.form-group').append('<div class="errMsg"><p>This field is required.</p></div>');
        }

        else if(input_field.next().hasClass('errMsg')) {
            input_field.next().find('p').html('This field is required.');
        }
    }

    else {
        checkNumberInput(input_field);
    }
    
}

function checkNumberInput(input_field){
    if (/[0-9]/.test(input_field.val())) {

        input_field.removeClass("pass");
        input_field.addClass("err");
        input_field.parent('.form-group').removeClass("form-pass");
        input_field.parent('.form-group').addClass("form-err");
        input_field.parent('.form-group').find('label').addClass('ic-err');

        if (!input_field.next().hasClass('errMsg')) {
            input_field.parent('.form-group').append('<div class="errMsg"><p>Please do not enter numbers.</p></div>');
        }

        else if(input_field.next().hasClass('errMsg')) {
            input_field.next().find('p').html('Please do not enter numbers.');
        }
    }

    else {
        input_field.removeClass("err");
        input_field.parent('.form-group').removeClass("form-err");
        input_field.parent('.form-group').addClass("form-pass");
        input_field.addClass("pass");
        input_field.next().remove();
        input_field.parent('.form-group').find('label').removeClass('ic-err');
        input_field.parent('.form-group').find('label').addClass('ic-pass');
    }
}


function validateReqDropdown(select_field) {
    if(select_field.val() == "None") {
        select_field.removeClass("pass");
        select_field.addClass("err");
        select_field.parent('.form-group').removeClass("form-pass");
        select_field.parent('.form-group').addClass("form-err");
        select_field.parent('.form-group').find('label').removeClass('ic-pass');
        select_field.parent('.form-group').find('label').addClass('ic-err');

        if (!select_field.next().hasClass('errMsg')) {
                select_field.parent('.form-group').append('<div class="errMsg"><p>This field is required.</p></div>');
        }

        else if(select_field.next().hasClass('errMsg')) {
                select_field.next().find('p').html('This field is required.');
        }

        select_field.next('.errMsg').css("color", "");
        select_field.next('.errMsg').css("background-color", "");
    }

    else {
        select_field.removeClass("err");
        select_field.parent('.form-group').removeClass("form-err");
        select_field.addClass("pass");
        select_field.parent('.form-group').addClass("form-pass");
        if ((select_field[0] == $("select[name='00N3000000BZj7M']")[0] || select_field[0] == $("select[name='Country__c']")[0]) && $('form').hasClass('freetrial') ) {
            if (select_field.val() == "United States of America") {
                console.log("true-rt");
                if (select_field.next().hasClass('errMsg')) {
                    select_field.next().find('p').html('Looking for US legislation, case law and practical guidance? <a href="https://www.lexisnexis.com/en-us/products/lexis-advance.page" target="_blank">Please click here.</a>');
                } else if (!select_field.next().hasClass('errMsg')) {
                    select_field.parent('.form-group').append('<div class="errMsg"><p>Looking for US legislation, case law and practical guidance? <a href="https://www.lexisnexis.com/en-us/products/lexis-advance.page" target="_blank">Please click here.</a></p></div>');
                }
                select_field.next('.errMsg').css("color", "#0c5fca");
                select_field.next('.errMsg').css("background-color", "#cce5ff");
            }
            else {
                console.log("false-rt");
                select_field.next().remove();
            }
        }
        else {
            console.log("false-rt");
            select_field.next().remove();
        }
        select_field.parent('.form-group').find('label').removeClass('ic-err');
        select_field.parent('.form-group').find('label').addClass('ic-pass');
    }
    
}


function validatePhone(input_field) {
	input_field.removeClass("warn");
	input_field.parent('.form-group').removeClass("form-warn");

	if(input_field.val().length == 0) {
		
		input_field.removeClass("pass");
		input_field.addClass("err");
		input_field.parent('.form-group').removeClass("form-pass");
		input_field.parent('.form-group').addClass("form-err");
		input_field.parent('.form-group').find('label').removeClass('ic-pass');
		input_field.parent('.form-group').find('label').addClass('ic-err');

		if (!input_field.next().hasClass('errMsg')) {
			input_field.parent('.form-group').append('<div class="errMsg"><p>This field is required.</p></div>');
		}

		else if(input_field.next().hasClass('errMsg')) {
			input_field.next().find('p').html('This field is required.');
		}

		return false;
	}

	else if(input_field.val().length <= 5) {
		input_field.removeClass("pass");
		input_field.addClass("err");
		input_field.parent('.form-group').removeClass("form-pass");
		input_field.parent('.form-group').addClass("form-err");
		input_field.parent('.form-group').find('label').removeClass('ic-pass');
		input_field.parent('.form-group').find('label').addClass('ic-err');

		if (!input_field.next().hasClass('errMsg')) {
			input_field.parent('.form-group').append('<div class="errMsg"><p>Phone number is too short.</p></div>');
		}

		else if(input_field.next().hasClass('errMsg')) {
			input_field.next().find('p').html('Phone number is too short.');
		}

		return false;
	}

	else {
		input_field.removeClass("err");
		input_field.parent('.form-group').removeClass("form-err");
		input_field.parent('.form-group').addClass("form-pass");
		input_field.addClass("pass");
		input_field.next().remove();
		input_field.parent('.form-group').find('label').removeClass('ic-err');
		input_field.parent('.form-group').find('label').addClass('ic-pass');
		return true;
	}
}

function removeNumber(input_field) {
    var letter = input_field.val().replace(/[^a-zA-Z]/g, '');
    input_field.val(letter);
}


function changeColor(input_field){
    if(input_field.val() == "None") {
        input_field.css("color","#868e96");
    }

    else {
        input_field.css("color","#555");
        console.log("changed");
    }
}