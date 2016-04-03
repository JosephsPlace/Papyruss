/*
 *
 * Papyruss Framework
 * Created by Joseph Gengarella
 *
 */

/* global jQuery, window */

/*
 * Make sure jQuery is included
 */
if (typeof jQuery == 'undefined') {
   throw new Error('Papyruss needs jQuery to run correcly, sorry :(');
}


/*
 * This is the basic function structure
 *
 * (function ($) {
 *    'use strict';
 * })(jQuery);
 */

/*
 * All logic behind the navbar toggle and it's responsiveness
 */

(function ($) {
   'use strict';

   var prev_size = $(window).width();
   var current_width = $(window).width();
   var sidebar = $('.nav-sidebar');
   var nav_toggle_link = $('.toggle-wrapper');
   var nav_toggle = $('.nav-toggle');
   var navbar = $('#navbar');

   if (sidebar.length) {
      navbar.show();
   }

   nav_toggle_link.on('click', function (e) {
      e.preventDefault();

      nav_toggle.toggleClass('opened');

      if (!sidebar.length) {
         navbar.slideToggle();
      } else if (sidebar.length) {
         sidebar.toggleClass('sidebar-active');

         if (sidebar.hasClass('sidebar-active')) {
            sidebar.animate({
               'margin-left': 0
            });
         } else {
            sidebar.animate({
               'margin-left': -250
            });
         }

      }
   });

   // Currntly not working...
   $(window).resize(function (e) {
      e.preventDefault();

      console.log("we");
      if ($(this).width() > 767) {
         navbar.show();
      }

      if ($(this).width() > 767 && prev_size < 767) {
         if (sidebar.length) {
            sidebar.css({
               'margin-left': 0
            });
            nav_toggle.removeClass('opened');
            sidebar.removeClass('sidebar-active');
         }
         prev_size = $(this).width();
      } else if ($(this).width() < 768 && prev_size > 768) {
         if (sidebar.length) {
            navbar.show();
            sidebar.css({
               'margin-left': -250
            });
         }
         if (!sidebar.length) {
            nav_toggle.removeClass('opened');
            navbar.hide();
         }
         prev_size = $(this).width();
      }
      current_width = $(this).width();
   });
})(jQuery);

/*
 * Adds padding on top/bot of screen for fixed top/bot nav bar
 */

(function ($) {
   'use strict';

   var page_content = $('#page-content');
   var top_is_fixed = $('.nav-top-fixed').length;
   var bot_is_fixed = $('.nav-bot-fixed').length;

   if (top_is_fixed) {
      page_content.css({
         'margin-top': $('nav').height() + 20
      });
   }
   if (bot_is_fixed) {
      page_content.css({
         'margin-bottom': $('nav').height() + 20
      });
   }
})(jQuery);


/*
 * Allows for scrolling to link locations
 */

(function ($) {
   'use strict';

   var scroll_el = $('.scroll');
   var nav = $('nav');
   var top_offset = 20;
   var window = $(window);
   var top_nav = $('.nav-top').length;

   if (top_nav) {
      top_offset += nav.height();
   }

   scroll_el.on('click', function (e) {
      e.preventDefault();

      $('html, body').animate({
         scrollTop: $(this.hash).offset().top - top_offset
      }, 500);
   });
})(jQuery);

/*
 * Scroll spy for inline links
 */

(function ($) {
   'use strict';

   var top_offset = 20;
   var sidebar = $('.nav-sidebar').length;
   var nav = $('nav');
   if (!sidebar) {
      top_offset += nav.height();
   }


   var prev_id;
   var first = $('#navbar').find('a')
               .attr('href').replace('#', '');
   var navbar = $('#navbar');
   var nav_links = navbar.find('a');
   var nav_list =
      nav_links.map(function () {
         var item = $($(this).attr('href'));
         if (item.length) {
            return item;
         }
      });

   $(window).scroll(function () {
      var distance_top = $(this).scrollTop() + top_offset;

      var cur = nav_list.map(function () {
         if ($(this).offset().top < distance_top) {
            return this;
         }
      });
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : first;

      if (prev_id !== id) {
         prev_id = id;
         console.log(id);
         nav_links
            .removeClass('nav-active')
            .filter('[href="#' + id + '"]').addClass('nav-active');
      }
   });
})(jQuery);
