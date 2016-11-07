var Slide = function($container) {
  this.$container = typeof $container != 'undefined' ? $container : '.carousel-ul';
  this.$carrossel;

  this.init = function() {
    this.galeria();      
  }

  this.galeria = function() {
      this.$carousel = new ch.Carousel(ch(this.$container)[0], {
          pagination: false
      });
  }
}



var MainMeli = {
  init: function() {

      /*Init Galeria*/
      var $slide = new Slide();
      $slide.init();

      //var tabs = new ch.Tabs(ch(".questoes-tabs")[0]);  
      
  }
}

;(function() {
 window.addEventListener("load", function(event) { MainMeli.init();}); //bug load chico-ui.min.js
})();