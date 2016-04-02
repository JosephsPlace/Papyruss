/*
 *
 * Papyruss Framework
 * Created by Joseph Gengarella
 *
*/

if (typeof jQuery == 'undefined') {
   throw new Error('Papyruss needs jQuery to run correcly, sorry :(');
}


/*
 * This is the basic function structure
*/
~function ($) {
   'use strict';
}(jQuery);

/*
 * Navbar toggle
*/
~function ($) {
   'use strict';

   var window_width = $(window).width();
   var page_content = $('#page-content');
   var sidebar = $('.nav-sidebar');
   var nav_toggle_link = $('.toggle-wrapper');
   var nav_toggle = $('.nav-toggle');
   var navbar = $('#navbar');

    $(window).resize(function ( e ) {
       var window_width = $(this).width();
    });

   if (sidebar.length)
      navbar.show();

   $(window).resize(function ( e ) {
      if ($(this).width() > 767) {
         if (sidebar.length)
            sidebar.css({'margin-left' : 0});
         if (!sidebar.length)
            navbar.show();
      }
      console.log($(this).width());
   });

   nav_toggle_link.on('click', function ( e ) {
      e.preventDefault();
      $(nav_toggle).toggleClass('opened');
      if (!sidebar.length) {
         console.log("test");
         navbar.slideToggle();
      } else if (sidebar.length) {
         console.log("test2");
         sidebar.toggleClass('sidebar-active');
         if (sidebar.hasClass('sidebar-active')) {
            sidebar.animate({
               'margin-left' : 0
            });
         } else {
            sidebar.animate({
               'margin-left' : -250
            });
         }
      }
   });
}(jQuery);

/*
 * Fixed navbar
*/
~function ($) {
   'use strict';

   var nav_opened = $('.opened');
   var page_content = $('#page-content');
   var has_sidebar = $('nav-sidebar');
   var is_fixed = $('.nav-top-fixed').length;

   if (is_fixed)
      page_content.css({
         'margin-top' : $('nav').height() + 20
      });


}(jQuery);
