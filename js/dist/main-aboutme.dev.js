"use strict";

var nCount = function nCount(selector) {
  $(selector).each(function () {
    $(this).animate({
      Counter: $(this).text()
    }, {
      // A string or number determining how long the animation will run.
      duration: 4000,
      // A string indicating which easing function to use for the transition.
      easing: "swing",

      /**
       * A function to be called for each animated property of each animated element. 
       * This function provides an opportunity to
       *  modify the Tween object to change the value of the property before it is set.
       */
      step: function step(value) {
        $(this).text(Math.ceil(value));
      }
    });
  });
};

var a = 0;
$(window).scroll(function () {
  // The .offset() method allows us to retrieve the current position of an element  relative to the document
  var oTop = $(".numbers").offset().top - window.innerHeight;

  if (a == 0 && $(window).scrollTop() >= oTop) {
    a++;
    nCount(".rect > h1");
  }
});
/**
 *
 *  sticky navigation
 *
 */

var navbar = $(".navbar");
$(window).scroll(function () {
  // get the complete hight of window
  var oTop = $(".section-2").offset().top - window.innerHeight;

  if ($(window).scrollTop() > oTop) {
    navbar.addClass("sticky");
  } else {
    navbar.removeClass("sticky");
  }
});
//# sourceMappingURL=main-aboutme.dev.js.map
