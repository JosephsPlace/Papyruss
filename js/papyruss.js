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

   nav_toggle.on('click', function ( e ) {
      $(this).toggleClass('opened');
   });
}(jQuery);

~function ($) {
   'use strict';

   var is_fixed;

   if ($('.nav-top-fixed').length ||
      $('.nav-bot-fixed').length ||
      $('nav-sidebar-fixed.length'))
      is_fixed = true;

   if (is_fixed)
      $('body').css({
         'padding-top' : $('#navbar').height() + 20
      });


}(jQuery);
