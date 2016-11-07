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