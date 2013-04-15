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
describe('cutup Jquery responsive', function(){
  var $el;
  beforeEach(function(){
    loadFixtures('fragment.html');
    $el = $('#fixtures');
  });
  it('Should accept a object as an argument only if enquire has been added to the project', function(){
    expect(function(){
      $el.cutup({
        'test':'img'
      }, {
        width:100,
        height:200
      });
    }).toThrow();
    
    
  })
});
