describe('cutup Jquery plugin tests', function(){
  var $el;
  beforeEach(function(){
    loadFixtures('fragment.html');
    $el = $('#fixtures');
  });

  it('should be defined', function(){
    expect($.fn.cutup).toBeDefined();
  });
  it('should should throw an error if it does not get an image', function(){
    expect(function(){
      $el.cutup()
    }).toThrow();
  });
  it('should be chainable', function(){
    expect($el.cutup('test')).toBe($el);
  });
  
  
  it('should create a wrapper around the targeted element', function(){
    $el.cutup('test.png', {
      width:100,
      height:200
    });
    expect($el.hasClass('cutupjs-working-element')).toBeTruthy();
    expect($('.cutupjs-wrapper').length).toBe(1);
    expect($('.cutupjs-guideline').length).toBe(1);
    expect($('.cutupjs-wrapper').width()).toBe(100);
    expect($('.cutupjs-wrapper').height()).toBe(200);
  });
  it('should allow a is_active as a property', function(){
    $el.cutup('test.png', {
      is_active:true,
      width:100,
      height:200
    });
    expect($('.cutupjs-wrapper').hasClass('cutupjs-active')).toBeTruthy();
  });
  it('should create a navigation panel', function(){
    $el.cutup('test.png', {
      width:100,
      height:200
    });
    expect($('.cutupjs-wrapper .cutup-action-panel').length).toBe(1);
    expect($('.cutupjs-wrapper .cutup-action-panel .cutup-activate').length).toBe(1);
  })
  it('should allow the user to activate an elment by click', function(){
    $el.cutup('test.png', {
      width:100,
      height:200
    });
    $('.cutupjs-wrapper .cutup-action-panel .cutup-activate').click();
    expect($('.cutupjs-wrapper').hasClass('cutupjs-active')).toBeTruthy();

  });
  it('should have an active flag', function(){
    $el.cutup('test');
    expect($('.cutupjs-wrapper').length).toBe(1);
    expect($('.cutupjs-wrapper').hasClass('cutupjs-active')).toBeFalsy();
    
    $el.trigger('cutup:activate');
    expect($('.cutupjs-wrapper').hasClass('cutupjs-active')).toBeTruthy();
    
    $el.trigger('cutup:activate');
    expect($('.cutupjs-wrapper').hasClass('cutupjs-active')).toBeFalsy();
    
  });

});

