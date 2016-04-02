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

   var nav_toggle = $('.nav-toggle');
   var navbar = $('#navbar');

   if (nav_toggle) {
      navbar.hide();
   }

   nav_toggle.on('click', function ( e ) {
      $(this).toggleClass('opened');
      navbar.slideToggle();
   });
}(jQuery);

/*
 * Fixed navbar
*/
~function ($) {
   'use strict';

   var is_fixed = $('.nav-top-fixed').length;

   if (is_fixed)
      $('body').css({
         'padding-top' : $('nav').height() + 20
      });


}(jQuery);
