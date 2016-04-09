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

   var prev_size = $(window).width(),
      current_width = $(window).width(),
      sidebar = $('.nav-sidebar'),
      nav_toggle_link = $('.toggle-wrapper'),
      nav_toggle = $('.nav-toggle'),
      navbar = $('#navbar');

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

   $(window).resize(function (e) {
      e.preventDefault();

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

   var page_content = $('#page-content'),
      top_is_fixed = $('.nav-top-fixed').length,
      bot_is_fixed = $('.nav-bot-fixed').length;

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

   var scroll_el = $('.scroll'),
      nav = $('nav'),
      top_offset = 20,
      window = $(window),
      top_nav = $('.nav-top').length;

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

   var top_offset = 21,
      sidebar = $('.nav-sidebar').length,
      nav = $('nav');
   if (!sidebar) {
      top_offset += nav.height();
   }


   var prev_id,
      first = $('#navbar').find('a')
      .attr('href').replace('#', ''),
      navbar = $('#navbar'),
      nav_links = navbar.find('a'),
      nav_list =
      nav_links.map(function () {
         var item = $($(this).attr('href'));
         if (item.length) {
            return item;
         }
      });

   $(window).scroll(function () {
      var distance_top = $(this).scrollTop() + top_offset,
         cur = nav_list.map(function () {
            if ($(this).offset().top < distance_top) {
               return this;
            }
         });

      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : first;

      if (prev_id !== id) {
         prev_id = id;
         nav_links
            .removeClass('nav-active')
            .filter('[href="#' + id + '"]')
            .addClass('nav-active');
      }
   });
})(jQuery);

(function ($) {
   'use strict';

   var obj = this;
   var slider_interval = null;

   var settings = {
      slider_container: 'slider',
      slider_class: '.slider',
      slide_list: '.slider ul',
      slides: '.slider ul li',
      auto_scroll: true,
      controls: true,
      tracker: true,
      current_slide: 0,
      slide_width: 0,
      slide_height: 0,
      interval: 2000,
      slide_speed: 500,
      slide_speed_fast: 200
   };

   obj.slide_count = $(settings.slides).length;
   obj.current_slide = 0;

   settings.slide_width = $(settings.slides).width();
   settings.slide_height = $(settings.slides).height();

   $(settings.slider_class).css({
      width: settings.slide_width,
      height: settings.slide_height
   });

   $(settings.slide_list).css({
      width: settings.slide_width * obj.slide_count,
      height: settings.slide_height
   });

   if (settings.controls) {
      $(settings.slider_class).after('<a class="control_prev">Prev</a> <a class="control_next">Next</a>');
   }

   if (settings.tracker) {
      $('.slider').after('<div class="slider-controls"><ul></ul></div>');

      console.log("test");

      for (var i = 0; i < obj.slide_count; i++) {
         $('.slider-controls ul').append(' <li class="slide-control" data-index="' + i + '"></li> ');
      }

      $('.slider-controls ul li').first().addClass('active');
   }

   $(settings.slides).each(function (i) {
      $(this).attr('data-index', i);
   });

   function setSlideInterval() {
      clearInterval(slider_interval);
      slider_interval = setInterval(function () {
         obj.nextSlide();
      }, settings.interval);
   }

   setSlideInterval();

   $('.slide-control').click(function () {
      if (obj.current_slide < $(this).attr('data-index')) {
         obj.nextSlide(parseInt($(this).attr('data-index')));
      } else if (obj.current_slide > $(this).attr('data-index')) {
         obj.prevSlide(parseInt($(this).attr('data-index')));
      }
   });

   $('a.control_prev').click(function () {
      obj.prevSlide();
      clearInterval(slider_interval);
      setSlideInterval();
   });

   $('a.control_next').click(function () {
      obj.nextSlide();
      clearInterval(slider_interval);
      setSlideInterval();
   });

   obj.changeControls = function (slide) {
      $('.slide-control').each(function () {
         if (parseInt($(this).attr('data-index')) === slide) {
            $(this).addClass('active');
         } else {
            $(this).removeClass('active');
         }
      });
   };

   obj.nextSlide = function (slide) {
      obj.current_slide = (obj.current_slide + 1 != obj.slide_count) ? parseInt($(settings.slides).first().attr('data-index')) + 1 : 0;

      obj.changeControls(obj.current_slide);
      $(settings.slide_list).animate({
         left: -settings.slide_width
      }, (slide) ? settings.slide_speed_fast : settings.slide_speed, function () {
         $(settings.slides).first().appendTo(settings.slide_list);
         $(settings.slide_list).css('left', 0);
         if (slide) {
            if (obj.current_slide < slide) {
               clearInterval(slider_interval);
               setSlideInterval();
               obj.nextSlide(slide);
            }
         }
      });
   };

   obj.prevSlide = function (slide) {
      obj.current_slide = parseInt($(settings.slides).first().attr('data-index'));
      obj.current_slide = (obj.current_slide - 1 >= 0) ? parseInt($(settings.slides).first().attr('data-index')) - 1 : obj.slide_count - 1;

      console.log("slide" + slide);

      obj.changeControls(obj.current_slide);

      $(settings.slides).last().prependTo(settings.slide_list);
      $(settings.slide_list).css('left', '-100%');

      $(settings.slide_list).animate({
         left: 0
      }, (slide >= 0) ? settings.slide_speed_fast : settings.slide_speed, function () {
         if (slide >= 0) {
            if (obj.current_slide > parseInt(slide)) {
               clearInterval(slider_interval);
               setSlideInterval();
               obj.prevSlide(slide);
            }
         }
      });
   };
})(jQuery);
