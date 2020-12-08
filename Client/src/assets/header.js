(function($) {
  $(function() {
    // initilize functions
    function navbarTracker(event) {
      var offset = $('#hover-event').offset();
      var elementX = event.pageX - offset.left;
      var elementWidth = $('#hover-event').width();
      var numberOfElements = $('.nav-item').length;
      var trackerWidth = elementWidth / numberOfElements;
      var numberOfElement = $(this).index('.nav-link');

      $('#hover-tracker').css('width', trackerWidth + 'px');
      $('#hover-tracker').css('left', trackerWidth * numberOfElement + 'px');
    }
    
    function fadeInTracker() {
      $('#hover-tracker').fadeIn(150);
    }

    function fadeOutTracker() {
      $('#hover-tracker').fadeOut(150);
    }
    
    // event handler
    $('.nav-link').mouseover(navbarTracker);
    $('#hover-event').mouseover(fadeInTracker);
    $('#hover-event').mouseleave(fadeOutTracker);
  })
}) (jQuery);