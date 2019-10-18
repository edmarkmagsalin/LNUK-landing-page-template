// Widget Save Code Starts
$('#form').submit(function(e){
   
  IsValid = Validate();
       
  if(IsValid){
    console.log('valid');
    // Post to the preference centre.
    e.preventDefault(); // Cancel the submit event
    $(this).off('submit'); // Unbind the submit event so this function doesn't fire upon the next submit
    
    var FormID = '16'; // Your form id
    var LicenseID = '0A94C7C6-FBD0-4178-82F9-6791A23C33FA'; // Your preference centre License ID
    
    var PostURL = 'https://prefservice.smartwebportal.co.uk/preferencecentrewebservice.ashx?action=SaveWidget&formID='+FormID+'&LicenseID='+LicenseID;

    var ObjectArray = []; // Define an empty Object Array
    var RecordObject = {}; // Define an empty Record Object for holding data
    
    /*
    * Forename, Surname and Email1 are required fields within the RecordObject,
    * the remaining fields are optional and need not be defined at all unless
    * you plan to use them.
    */
    
    RecordObject.DivID = "PrefWidget"; // This is the name of the container that holds the preference centre widget.

    // form going to Salesforce
    if (($('#form').attr('action').val()) == "https://webto.salesforce.com/servlet/servlet.WebToLead") {
      alert('SF form submit');
      RecordObject.Title = $('select[name="salutation"]').val();
      RecordObject.Forename = $('input[name="first_name"]').val(); // REQUIRED
      RecordObject.Surname = $('input[name="last_name"]').val(); // REQUIRED
      RecordObject.Email1 = $('input[name="email"]').val();      // REQUIRED
      RecordObject.Mobile = $('input[name="phone"]').val();
      RecordObject.BusinessName = $('input[name="company"]').val();
      RecordObject.Postcode = $('input[name="Postcode__c"]').val(); // Postcode
      RecordObject.Country = $('select[name="Country__c"]').val();    // Country
      RecordObject.SourceCode = $('input[name="URL__c"]').val();  // URL
    }
    // form going to Marketing Cloud
    else if (($('#form').attr('action').val()) == "https://cl.s7.exct.net/DEManager.aspx"){
      alert('MC form submit');
      RecordObject.Title = $('select[name="Salutation"]').val();
      RecordObject.Forename = $('input[name="FirstName"]').val(); // REQUIRED
      RecordObject.Surname = $('input[name="Surname"]').val(); // REQUIRED
      RecordObject.Email1 = $('input[name="Email_Address"]').val(); // REQUIRED
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
        $('#form').submit();
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

// Decibel Insight - www.lexisnexis.co.uk : BEGIN
// <![CDATA[
(function(d, e, c, i, b, el, it) {
  d._da_ = d._da_ || [];
  _da_.oldErr = d.onerror;
  _da_.err = [];
  d.onerror = function(er) { _da_.err.push(er);
    _da_.oldErr && _da_.oldErr(er); };
  d.DecibelInsight = b;
  d[b] = d[b] || function() {
    (d[b].q = d[b].q || []).push(arguments); };
  el = e.createElement(c), it = e.getElementsByTagName(c)[0];
  el.async = 1;
  el.src = i;
  it.parentNode.insertBefore(el, it);
})(window, document, 'script', '//decibelinsight.net/i/13476/di.js', 'decibelInsight');
// ]]>
// Decibel Insight - www.lexisnexis.co.uk : END

// Cookie Consent: BEGIN
window.cookieconsent.initialise({
  palette: {
    popup: {
      background: '#ffffc6'
    },
    button: {
      background: '#f5d948'
    }
  },
  theme: 'edgeless',
  content: {
    message: 'We use cookies to enable digital experiences.',
    dismiss: 'Browse on or click to Agree',
    link: 'Disable them/read more',
    href: 'https://www.lexisnexis.co.uk/cookies'
  }
});
// Cookie Consent: END


$(document).ready(function() {

  // Add smooth scrolling to all links : BEGIN
  $('a[target="_parent"]').on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    }
  });
  // Add smooth scrolling to all links : END

  // Widget DOM Ready Event :  BEGIN
  GetWidget('16', '0A94C7C6-FBD0-4178-82F9-6791A23C33FA', 'PrefWidget', '00');
  // Widget DOM Ready Event : END

  // Widget Get Code : BEGIN
  function GetWidget(FormID, LicenseID, DivID, Type) {
    var url = 'https://prefservice.smartwebportal.co.uk/preferencecentrewebservice.ashx?action=GetWidget&formID=' + FormID + '&divID=' + DivID + '&LicenseID=' + LicenseID + '&widgettype=' + Type;
    console.log('Getting widget type: ' + Type);
    
    $.ajax({
      url: url,
      type: 'GET',
      processData: false,
      dataType: 'json',
      context: document.body,
      
      success: function(result, status, xhr) {
        console.log('Successful GetWidget call');
        var widgetBody = result.widgetBody;
        widgetBody.replace('"', '"');
        $('#' + DivID).html(widgetBody);
      },
      error: function(xhr, status, error) {
        console.log('Failed GetWidget call\r\n' + 'Error=' + error);
        $('.padding10').html('<h2>The preference centre server is not responding</h2>');
      },
      async: false
    });
  }
  // Widget Get Code : END

});

// Sticky form : BEGIN
$(document).scroll(function() {
  if (window.matchMedia("(min-width: 992px)").matches) {
    var y = $(document).scrollTop(),
    stickyForm = $(".form");
    if (y >= 410) {
      stickyForm.css({
        position: "fixed",
        "top": "10",
        "left": "80"
      });
    }
    else {
      stickyForm.css("position", "sticky");
    }
  }
});
// Sticky form : END