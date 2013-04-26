// Name        : cutup
// Description : The best jQuery plugin ever.
// Author      : vhoang, vhoang@deloitte.com.au
// Version     : 0.1.0
// Repo        : git://github.com/vyhoang/cutup.git
// Website     : https://github.com/vyhoang/cutup

/**
 * How to use it
 * -------------
Standard call
```
$('selector').cutup('image_url');
```
Call with dimensions
```
$('selector').cutup('image_url', {
  width:240,
  height:200
});
```

*/

(function($) {

  // Collection method.
  $.fn.cutup = function(image, o) {
    var img;
    if(typeof image == 'string' || typeof image == 'object'){
     img = image;
    }
    else if(typeof image == 'undefined') {
      
       throw new Error('You need to provide a screenshot image. Check the doucmentation for more info.');
    }
    return this.each(function(i,n) {
      new $.cutup(img, n, o);
    });
  };

  // Static method.
  $.cutup = function(image, el, options) {
    
   
    var _self = this,
        $el = $(el),
        is_activated = false,
        is_cmd = false,
        is_responsive = false,
        working_opacity = 1,
        refImg,
        w = 0,
        h = 0;
    var _default = {
    };
    
    
    $el.addClass('cutupjs-working-element');
    $el.wrap('<div class="cutupjs-wrapper">');
    var $wrapper = $el.closest('.cutupjs-wrapper');
    $wrapper.prepend('<div class="cutupjs-guideline"></div>');
    
    var actionPanel = $('<ul class="cutup-action-panel">');
    actionPanel.append('<li class="cutup-activate"><span class="cu-on">On</span><span class="cu-off">Off</span></li>');
    $wrapper.prepend(actionPanel);
    
    var $guideline = $wrapper.find('.cutupjs-guideline');
    
    
    // Method
    // ======
    
    
    
    var activateElement = function(){
      if(!is_activated){
        is_activated = true;
        $wrapper.addClass('cutupjs-active');
      } else{
        is_activated = false;
        $wrapper.removeClass('cutupjs-active');
        
        working_opacity = 1;
        $el.css({
          opacity:working_opacity
        });
      }
    } 
    
    var getCutupDimensions = function(callback){
      var img = new Image();
      img.onload = function() {
        w = this.width;
        h = this.height;
        if(typeof callback == 'function'){
          callback();
        }
        
      }
      img.src = refImg;
    }
    var register_enquire = function(query , img, defaultImg){
      refImg = img;
      enquire.register(query, {
        unmatch : function(e) {
           $guideline.css({
            'background-image':'url('+defaultImg+')',
            'background-repeat':'no-repeat'
          });
        },
        match : function(e) {

          $guideline.css({
            'background-image':'url('+refImg+')',
            'background-repeat':'no-repeat'
          });
        }
      })
    }
    // STARTUP
    // =======
    
    this.settings = $.extend( _default , options );
    
    if(typeof image == 'object'   ){
      if(typeof enquire == 'undefined'){
        throw new Error('Please add enquire.js if you want to use media queries.');
        return;
      }  else{
        refImg = image["default"];
        for (var query in image) {
          if (image.hasOwnProperty(query) && query != 'default') { 
            register_enquire(query, image[query], image["default"]);
          }
          enquire.listen(200);
        }
      }
    } else{
      refImg = image;
    }
    
    $guideline.css({
      'background-image':'url('+refImg+')',
      'background-repeat':'no-repeat'
    });
    
    if( typeof options != 'undefined' && 
        ( typeof options.width != 'undefined' || 
          typeof options.height != 'undefined' 
        )
      ){
      $wrapper.css({
        width:options.width,
        height:options.height,
        overflow:'auto'
      });
      getCutupDimensions(function(){
        $guideline.width(w);
        $guideline.height(h);
      });
      
    } else {
      $guideline.width($wrapper.width());
      $guideline.height($wrapper.height());
    }
    
    // Event 
    // =====
    
    $wrapper.find('.cutup-activate').on('click', function(){
      console.log('triggered');
      console.log($(this).closest('.cutupjs-wrapper'));
      $(this).closest('.cutupjs-wrapper').trigger('cutup:activate');
    });
    
    // Change of opacity triggered
    $el.bind('cutup:opacity-shift', function(e, direction){
      
      // It only affect elements activated.
      if(!is_activated){
        return;
      }
      if(direction == '+' && working_opacity < 1){
        working_opacity += 0.1;
      };
      if(direction == '-' && working_opacity > 0){
        working_opacity -= 0.1;
      };
      $el.css({
        opacity:working_opacity
      });
    });
    
    $wrapper.bind('cutup:activate', function(){
      activateElement();
    });
    
    // $wrapper.bind('click', function(e){
    //   if(e.ctrlKey || e.metaKey){
    //     activateElement();
    //   }
    // });
    
    
  };

  // Custom selector.
  $.expr[':'].cutup = function(elem) {
    return elem.textContent.indexOf('cutup') >= 0;
  };
  
  $(document).keydown(function (e){
    if (e.keyCode === 16){
       $('.cutupjs-wrapper').addClass('cutup-spotme');
    } 
  });
  
  $(document).keypress(function(e){
    
    // When the user press shift + '+'
    if(e.keyCode === 43 && e.shiftKey){
      $('.cutupjs-working-element').trigger('cutup:opacity-shift', '+');
    }
    
    // When the user press shift + '-'
    if(e.keyCode === 95 && e.shiftKey){
      $('.cutupjs-working-element').trigger('cutup:opacity-shift', '-');
    }
  });
  $(document).keyup(function(){
    $('.cutupjs-wrapper').removeClass('cutup-spotme');
  });
  $(window).on('resize', function(){
    console.log($(this).width());
  })
}(jQuery));

