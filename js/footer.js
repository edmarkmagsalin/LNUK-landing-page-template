// Widget Get Code : BEGIN
function GetWidget(FormID, LicenseID, DivID, Type) {
  var url =
    'https://prefserviceqa.smartwebportal.co.uk/preferencecentrewebservice.ashx?action=GetWidget&formID=' +
    FormID +
    '&divID=' +
    DivID +
    '&LicenseID=' +
    LicenseID +
    '&widgettype=' +
    Type;
  console.log('Getting widget type: ' + Type);
  //console.log("URL=" + url);

  $.ajax({
    url: url,
    type: 'GET',
    processData: false,
    dataType: 'json',
    context: document.body,
    success: function(result, status, xhr) {
      console.log('Successful GetWidget call');
      //console.log("Result=" + result.widgetBody);
      var widgetBody = result.widgetBody;
      widgetBody.replace('"', '"');
      $('#' + DivID).html(widgetBody);
    },
    error: function(xhr, status, error) {
      console.log('Failed GetWidget call\r\n' + 'Error=' + error);
      $('.padding10').html(
        '<h2>The preference centre server is not responding</h2>'
      );
    },
    async: false
  });
}
// Widget Get Code : END

$(document).ready(function() {
  // Widget DOM Ready Event :  BEGIN
  GetWidget('16', '9273c8a0-1b7f-4ab6-9a83-1087d12eb909', 'PrefWidget', '00');
  // Widget DOM Ready Event : END

  // Add smooth scrolling to all links
  $('a').on('click', function(event) {
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
    } // End if
  });
});

// <![CDATA[
(function(d, e, c, i, b, el, it) {
  d._da_ = d._da_ || [];
  _da_.oldErr = d.onerror;
  _da_.err = [];
  d.onerror = function(er) {
    _da_.err.push(er);
    _da_.oldErr && _da_.oldErr(er);
  };
  d.DecibelInsight = b;
  d[b] =
    d[b] ||
    function() {
      (d[b].q = d[b].q || []).push(arguments);
    };
  (el = e.createElement(c)), (it = e.getElementsByTagName(c)[0]);
  el.async = 1;
  el.src = i;
  it.parentNode.insertBefore(el, it);
})(
  window,
  document,
  'script',
  '//decibelinsight.net/i/13476/di.js',
  'decibelInsight'
);
// ]]>
