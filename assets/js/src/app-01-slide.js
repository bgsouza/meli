var Slide = function($container) {
  this.$carrossel = typeof $container != 'undefined' ? $container : '.carrossel-ul';

  this.init = function() {
    this.galeria();      
  }

  this.galeria = function() {
      var carousel = new ch.Carousel(ch(this.$carrossel)[0], {
          pagination: true
      });
  }
}

;(function() {
  var $slide = new Slide();
  $slide.init();
})();