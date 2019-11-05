$(document).ready(function () {
    $("select[id='salutation_2']").bind("focus click", function(){
        var salutation = $("select[id='salutation_2']");
        changeColor(salutation);
    });


    $("input[id='phone_2']").bind("keypress keyup blur", function (e) {
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

    $("input[id='first_name_2']").bind("keypress keyup blur", function(e){
        var inp = String.fromCharCode(e.keyCode);
        if(/[0-9]/.test(inp)) {
            removeNumber($(this));
        }
    });

    $("input[id='last_name_2']").bind("keypress keyup blur", function(e){
        var inp = String.fromCharCode(e.keyCode);
        if(/[0-9]/.test(inp)) {
            removeNumber($(this));
        }
    });


    /*keypress functions*/
    $("#salutation_2").bind("focusout", function(){
        var salutation = $("#salutation_2");
        validateReqDropdown(salutation);
    });

    $("input[id='first_name_2']").bind("focusout", function(){
        var first_name_field = $("input[id='first_name_2']");
        validateNameField(first_name_field); 
        
    });

    $("input[id='last_name_2']").bind("focusout", function(){
        var last_name_field = $("input[id='last_name_2']");
        validateNameField(last_name_field);
    });

    $("input[id='company_2']").bind("focusout", function(){
        var company_field = $("input[id='company_2']");
        validateField(company_field);
    });

    $("input[id='title_2']").bind("focusout", function(){
        var job_title = $("input[id='title_2']");
        validateField(job_title);
    });

    $("input[id='phone_2']").bind("focusout", function(){
        var phone_field = $("input[id='phone_2']");
        
        if ($("select[name='Country__c']").val() == "United Kingdom") {
            validateMobileNumber(phone_field);
        }
        else {
            validatePhone(phone_field);
        }

    });

    $("input[id='email_2']").bind("focusout", function(){
        var email_field = $("input[id='email_2']");
        validateEmailField(email_field);
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
function Validate_2(){

    var count = 0, check = false;

    // validate all .req : BEGIN
    $('.req').each(function() {

        if ($(this).attr('type') == 'checkbox' && $(this).prop('checked') == false) {

            $(this).addClass("err");
            /*$(this).parent('.form-group').addClass("form-err"); disabled because it is overlapping in the tickbox*/

            if (!$(this).next().next().hasClass('errMsg') && $(this).prop('checked') == false) {
                $(this).parent('.form-group').append('<div class="errMsg"><p>Please confirm checkbox.</p></div>');
                count++;
            } else if ($(this).next().next().hasClass('errMsg') && $(this).prop('checked') == false) {
                count++;
            }

        }

        else if ($(this).attr('type') == 'checkbox' && $(this).prop('checked') == true) {
            if ($(this).next().next().hasClass('errMsg') && $(this).prop('checked') == true) {
                $(this).removeClass("err");
                $(this).parent('.form-group').removeClass("form-err");
                $(this).addClass("pass");
                $(this).next().next().remove();
            }
        }

        else if ($(this).val().length == 0 || $(this).val() == "None") {

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

        else if ($(this).val() != "None" && $(this).attr('id') == 'salutation_2') {
            $(this).removeClass("err");
            $(this).parent('.form-group').removeClass("form-err");
            $(this).parent('.form-group').addClass("form-pass");
            $(this).addClass("pass");
            $(this).next().remove();
            $(this).parent('.form-group').find("label").removeClass("ic-err");
            $(this).parent('.form-group').find("label").addClass("ic-pass");

        }

        //for both MC and SF
        else if ($(this).val().length != 0 && $(this).attr('id') == 'first_name_2') {
            if ($(this).next().hasClass('errMsg') && !/^[a-zA-Z() ]+$/.test($(this).val())) {
                $(this).next().find('span').html('Please do not enter numbers.');
                count++;

            }
            else if ($(this).next().hasClass('errMsg') && /^[a-zA-Z() ]+$/.test($(this).val())) {
                $(this).next().remove();
            }

        }
        
        //for both MC and SF
        else if ($(this).val().length != 0 && $(this).attr('id') == 'last_name_2') {
            if ($(this).next().hasClass('errMsg') && !/^[a-zA-Z() ]+$/.test($(this).val())) {
                $(this).next().find('span').html('Please do not enter numbers.');
                count++;
            } else if ($(this).next().hasClass('errMsg') && /^[a-zA-Z() ]+$/.test($(this).val())) {
                $(this).next().remove();
            }

        }

        else if (($(this).val() != "None" && $(this).attr('id') == 'Country__c')) {
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

        else if ($(this).val().length != 0 && $(this).attr('id') == 'company_2') {
            $(this).removeClass("err");
            $(this).parent('.form-group').removeClass("form-err");
            $(this).parent('.form-group').addClass("form-pass");
            $(this).addClass("pass");
            $(this).next().remove();
            $(this).parent('.form-group').find("label").removeClass("ic-err");
            $(this).parent('.form-group').find("label").addClass("ic-pass");

        }

        else if ($(this).val().length != 0 && $(this).attr('id') == 'title_2') {
            $(this).removeClass("err");
            $(this).parent('.form-group').removeClass("form-err");
            $(this).parent('.form-group').addClass("form-pass");
            $(this).addClass("pass");
            $(this).next().remove();
            $(this).parent('.form-group').find("label").removeClass("ic-err");
            $(this).parent('.form-group').find("label").addClass("ic-pass");
        }

        else if ($(this).val().length != 0 && $(this).attr('id') == 'email_2') {
            if(!checkEmail_2($(this).val(), this)) {
                count++;
            }
        } 

        else if ($(this).val().length != 0 && $(this).attr('id') == 'phone_2') {
            if ($("select[name='Country__c']").val() == "United Kingdom") {
                if(!checkMobileNumber_2($(this).val())) {
                    count++;
                }
            }
            else {
                if(!validatePhone($(this))) {
                    count++;
                }
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


function checkEmail_2(str, i) {
    var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,5}|[0-9]{1,3})(\]?)$/;
    var public_email = /^[A-Za-z0-9._%+-]+@(gmail.com|hotmail.com|hotmail.co.uk|yahoo.com|yahoo.co.uk|outlook.com|btinternet.com|aol.com|live.co.uk|icloud.com|googlemail.com|me.com|sky.com|live.com|msn.com|ymail.com|btconnect.com|qq.com|aol.co.uk|ntlworld.com|mail.com|mac.com|mail.ru|linklaters.com|btopenworld.com|talktalk.net|mailinator.com|mvrht.net|gmx.com|)$/;
    if (re.test(str)) {

        if(public_email.test(str)) {
            if ($('#email_2').next().hasClass('errMsg')) {
                $('#email_2').next().find('p').html('It looks like you may have used a personal email address.<br>Please ensure the email you have entered is the one you use for work.');
            } else if (!$('#email_2').next().hasClass('errMsg')) {
                $('#email_2').parent('.form-group').append('<div class="errMsg"><p>It looks like you may have used a personal email address.<br>Please ensure the email you have entered is the one you use for work.</p></div>');
            }
            $('#email_2').removeClass("err");
            $('#email_2').addClass("pass");
            $('#email_2').parent('.form-group').removeClass("form-err");
            $('#email_2').parent('.form-group').addClass("form-pass");
            $('#email_2').next('.errMsg').addClass("p-email-prompt");
            $('#email_2').parent('.form-group').find('label').removeClass('ic-err');
            $('#email_2').parent('.form-group').find('label').addClass('ic-pass');
            return true;
        }

        else {
            $('#email_2').removeClass("err");
            $('#email_2').addClass("pass");
            $('#email_2').parent('.form-group').removeClass("form-err");
            $('#email_2').parent('.form-group').addClass("form-pass");
            $('#email_2').next().remove();
            $('#email_2').parent('.form-group').find('label').removeClass('ic-err');
            $('#email_2').parent('.form-group').find('label').addClass('ic-pass');
            return true;
        }
        
    } 

    else {
        $('#email_2').removeClass("pass");
        $('#email_2').addClass("err");
        $('#email_2').parent('.form-group').removeClass("form-pass");
        $('#email_2').parent('.form-group').addClass("form-err");
        $('#email_2').parent('.form-group').find('label').addClass('ic-err');

        if ($('#email_2').next().hasClass('errMsg')) {
            $('#email_2').next().find('p').html('Your email address is invalid.');
        } else if (!$('#email_2').next().hasClass('errMsg')) {
            $('#email_2').parent('.form-group').append('<div class="errMsg"><p>Your email address is invalid.</p></div>');
        }
        
        $('.p-email-prompt').removeClass("p-email-prompt");
        return false;
    }
}




function checkMobileNumber_2(str) {
    var firstTwoNum = /^07.*$/;
    var tooLong = /^07[0-9]{10,}$/;
    var finalCheck = /^07[0-9]{9}$/;

    $('#phone_2').removeClass("warn");
    $('#phone_2').parent('.form-group').removeClass("form-warn");

    if (firstTwoNum.test(str)) {

        if(tooLong.test(str)){
            $('#phone_2').removeClass("pass");
            $('#phone_2').addClass("err");
            $('#phone_2').parent('.form-group').removeClass("form-pass");
            $('#phone_2').parent('.form-group').addClass("form-err");
            $('#phone_2').parent('.form-group').find('label').addClass('ic-err'); 

            if ($('#phone_2').parent('.form-group').find('.errMsg').length !== 0) {
                $('#phone_2').parent('.form-group').find('.errMsg').find('p').html('The mobile number is too long.');
            } else if($('#phone_2').parent('.form-group').find('.errMsg').length == 0) {
                $('#phone_2').parent('.form-group').append('<div class="errMsg"><p>The mobile number is too long.</p></div>');
            }
            $('#phone_2').next('.errMsg').css("color", "#ed1c24");
            return false;
        }

        else if(finalCheck.test(str)) {
            $('#phone_2').removeClass("err");
            $('#phone_2').parent('.form-group').find('.errMsg').remove();
            $('#phone_2').parent('.form-group').removeClass("form-err");
            $('#phone_2').parent('.form-group').addClass("form-pass");
            $('#phone_2').addClass("pass");
            $('#phone_2').parent('.form-group').find('label').removeClass('ic-err');
            $('#phone_2').parent('.form-group').find('label').addClass('ic-pass');
            return true;
        }

        else {
            $('#phone_2').removeClass("pass");
            $('#phone_2').addClass("err");
            $('#phone_2').parent('.form-group').removeClass("form-pass");
            $('#phone_2').parent('.form-group').addClass("form-err");
            $('#phone_2').parent('.form-group').find('label').addClass('ic-err'); 

            if ($('#phone_2').parent('.form-group').find('.errMsg').length !== 0) {
                $('#phone_2').parent('.form-group').find('.errMsg').find('p').html('The mobile number is too short.');
            } else if($('#phone_2').parent('.form-group').find('.errMsg').length == 0) {
                $('#phone_2').parent('.form-group').append('<div class="errMsg"><p>The mobile number is too short.</p></div>');
            }
            $('#phone_2').next('.errMsg').css("color", "#ed1c24");
            return false;
        }
        
    } 

    else {
        $('#phone_2').removeClass("pass");
        $('#phone_2').parent('.form-group').removeClass("form-pass");

        $('#phone_2').removeClass("err");
        $('#phone_2').parent('.form-group').removeClass("form-err");

        $('#phone_2').addClass("warn");
        $('#phone_2').parent('.form-group').addClass("form-warn");
        

        if ($('#phone_2').parent('.form-group').find('.errMsg').length !== 0) {
            $('#phone_2').parent('.form-group').find('.errMsg').find('p').html('Check that this is a UK Mobile (starting 07) - we SMS your login credentials to you.');
        } else if($('#phone_2').parent('.form-group').find('.errMsg').length == 0) {
            $('#phone_2').parent('.form-group').append('<div class="errMsg"><p>Check that this is a UK Mobile (starting 07) - we SMS your login credentials to you.</p></div>');
        }
        $('#phone_2').next('.errMsg').css("color", "coral");
        return true;
    }
}

// Widget Save Code : BEGIN
$('#form_2').submit(function(e){
   
    IsValid = Validate();
         
    if(IsValid){
      console.log('valid');
      // Post to the preference centre.
      e.preventDefault(); // Cancel the submit event
      $(this).off('submit'); // Unbind the submit event so this function doesn't fire upon the next submit
      
      var FormID = '16'; // Your form id
      var LicenseID = '9273c8a0-1b7f-4ab6-9a83-1087d12eb909'; // Your preference centre License ID
      
      var PostURL = 'https://prefserviceqa.smartwebportal.co.uk/preferencecentrewebservice.ashx?action=SaveWidget&formID='+FormID+'&LicenseID='+LicenseID;
  
      var ObjectArray = []; // Define an empty Object Array
      var RecordObject = {}; // Define an empty Record Object for holding data
      
      /*
      * Forename, Surname and Email1 are required fields within the RecordObject,
      * the remaining fields are optional and need not be defined at all unless
      * you plan to use them.
      */
      
      RecordObject.DivID = "PrefWidget"; // This is the name of the container that holds the preference centre widget.
  
      // form going to Salesforce
      if ($('#form_2').attr('action') == "https://webto.salesforce.com/servlet/servlet.WebToLead") {
        console.log('SF form submit');
        RecordObject.Title = $('select[name="salutation"]').val();
        RecordObject.Forename = $('input[name="first_name"]').val();
        RecordObject.Surname = $('input[name="last_name"]').val();
        RecordObject.Email1 = $('input[name="email"]').val();
        RecordObject.Mobile = $('input[name="phone"]').val();
        RecordObject.BusinessName = $('input[name="company"]').val();
        RecordObject.Postcode = $('input[name="Postcode__c"]').val();
        RecordObject.Country = $('select[name="Country__c"]').val();
        RecordObject.SourceCode = $('input[name="URL__c"]').val();  // URL
      }
      // form going to Marketing Cloud
      else if ($('#form_2').attr('action') == "https://cl.s7.exct.net/DEManager.aspx"){
        console.log('MC form submit');
        RecordObject.Title = $('select[name="Salutation"]').val();
        RecordObject.Forename = $('input[name="FirstName"]').val();
        RecordObject.Surname = $('input[name="Surname"]').val();
        RecordObject.Email1 = $('input[name="Email_Address"]').val();
        RecordObject.BusinessName = $('input[name="company"]').val();
        RecordObject.SourceCode = $('input[name="URL"]').val(); // URL
      }
      RecordObject.FormName = "LEXISNEXISLEGAL_COUK";
  
      
      // Process preferences
      var PreferenceArray = [];
      
      // Process all checkboxes within the Preference Centre widget
      $('.prefCentreDiv input[type="checkbox"]').each(function(){
        var CheckboxID = $(this).attr('id');
        var CheckboxState; 
        if ($(this).is(':checked')) {CheckboxState = "1"} 
        else {CheckboxState = "0"};
  
        var Preference = {};
        
        Preference.FieldID = CheckboxID;
        Preference.IsChecked = CheckboxState;
        PreferenceArray.push(Preference);
      });
      
  
      // Process all radiobuttonlists within the Preference Centre widget
      $('.prefCentreDiv input[type="radio"]:checked').each(function(){
        var CheckboxID = $(this).closest('div').attr('id');
        var CheckboxState = $(this).val();
  
        var Preference = {};
          
        Preference.FieldID = CheckboxID;
        Preference.IsChecked = CheckboxState;
        PreferenceArray.push(Preference);
      });
  
      RecordObject.Preferences = PreferenceArray;
  
      // Process Admin preferences (if present)
      var AdminPreferenceArray = [];
  
      if (typeof $('#adminheaderid').val() !== "undefined") {
  
        var AdminPreference = {};
        
        AdminPreference.ChannelID = $('#adminchannelid').val();
        var headerfooter = $('#adminheaderid').val().split('|');
        AdminPreference.HeaderID = headerfooter[0];
        AdminPreference.FootnoteID = headerfooter[1];
        AdminPreference.SourceCode = $('#adminsourcecode').val();
        AdminPreference.ResponseChannel = $('#adminresponsechannel').val();
        AdminPreference.OptIn = $('#adminoptin').find(':selected').val();
  
        AdminPreferenceArray.push(AdminPreference);
        
      }
      
      RecordObject.AdminPreferences = AdminPreferenceArray;
        
      // Process any flags within the Flags section in the Preference Centre widget
      var FlagArray = [];
        
      $('#flagSection input[type="checkbox"]:checked').each(function(i,row){
  
        $this = $(this);
        
        var Flag = {};
        Flag.Flag = $this.closest('td').prev().text();
        Flag.Channel = $this.closest('td').next('td').find('option:checked').val();
        Flag.Reference = $this.closest('td').next('td').next('td').find('input').val();
        Flag.SourceCode = $('#sourcecode2').val();
        Flag.ResponseChannel = $('#responsechannel2 option:selected').val();
  
        Flag.AddedBy = "CAREWidget";
        Flag.AddedByID = $('input[name="CSPortalUserIDforADMINWidget"]').val(); // from CS Portal
        Flag.URN3 = $('input[name="ContactNumber"]').val(); // Unique supporter reference number
        
        FlagArray.push(Flag);
  
      });
      
      RecordObject.Flags = FlagArray;
  
      // Now push everything into RecordObject ready for AJAX call
      ObjectArray.push(RecordObject);
          
      // Post the data to the Preference Centre service
      $.ajax({
        data: { DataObject: JSON.stringify(RecordObject) },
        url: PostURL,
        type: "POST",
        dataType: "json",
        success : function(r,s,x){
          console.log("Successful SaveWidget call\r\n");
          // On successful post event, submit the form to the standard form handler on your website.
          $('#form_2').submit();
        },
        error: function(x,s,e){
          console.log("Error sending data to the preference centre: " + e);
          // Handle post error here
        }
      });
    }
  
    else{
      // Display your validation error messages
      console.log('not valid');
      return false;
    }
  
  });
  // Widget Save Code : END