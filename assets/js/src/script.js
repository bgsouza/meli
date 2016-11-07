var carousel;
var Slide = function($container) {
  this.$container = typeof $container != 'undefined' ? $container : '.carousel-ul';
  this.$carrossel;

  this.init = function() {
    this.galeria();      
  }

  this.galeria = function() {
      carousel = new ch.Carousel(ch(this.$container)[0], {
          pagination: false
      });
  }
}



var MainMeli = {
  init: function() {

      /*Init Galeria*/
      var $slide = new Slide();
      $slide.init();  
      
  }
}

;(function() {
 window.addEventListener("load", function(event) { MainMeli.init();}); //bug load chico-ui.min.js
})();