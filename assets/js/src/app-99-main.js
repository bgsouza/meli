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