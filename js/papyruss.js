/*
 *
 * Papyruss Framework
 * Created by Joseph Gengarella
 *
*/

/*
 * Make sure jQuery is included
*/
if (typeof jQuery == 'undefined') {
   throw new Error('Papyruss needs jQuery to run correcly, sorry :(');
}


/*
 * This is the basic function structure
 *
 * ~function ($) {
 *    'use strict';
 * }(jQuery);
*/

/*
 * All logic behind the navbar toggle and it's responsiveness
*/
~function ($) {
   'use strict';

   var window = $(window);
   var prev_size = window.width();
   var sidebar = $('.nav-sidebar');
   var nav_toggle_link = $('.toggle-wrapper');
   var nav_toggle = $('.nav-toggle');
   var navbar = $('#navbar');

   if (sidebar.length) {
      navbar.show();
   }

   window.resize(function ( e ) {
      e.preventDefault();

      if ($(this).width() > 767 && prev_size < 767) {
            if (sidebar.length) {
               sidebar.css({'margin-left' : 0});
               nav_toggle.removeClass('opened');
               sidebar.removeClass('sidebar-active');
            }
            if (!sidebar.length) {
               navbar.show();
            }
            prev_size = $(this).width();
         prev_size = $(this).width();
      } else if ($(this).width() < 768 && prev_size > 768) {
            if (sidebar.length) {
               navbar.show();
               sidebar.css({
                  'margin-left' : -250
               });
            }
            if (!sidebar.length) {
               nav_toggle.removeClass('opened');
               navbar.hide();
            }
         prev_size = $(this).width();
      }
   });

   nav_toggle_link.on('click', function ( e ) {
      e.preventDefault();

      nav_toggle.toggleClass('opened');

      if (!sidebar.length) {
         navbar.slideToggle();
      } else if (sidebar.length) {
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
 * Adds padding on top of screen for fixed top nav bar
*/
~function ($) {
   'use strict';

   var page_content = $('#page-content');
   var is_fixed = $('.nav-top-fixed').length;

   if (is_fixed) {
      page_content.css({
         'margin-top' : $('nav').height() + 20
      });
   }


}(jQuery);
