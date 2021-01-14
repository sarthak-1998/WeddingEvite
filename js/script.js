/**
 * @author Sarthak Jain <sarthak240498@gmail.com>
 */
(function ($) {
    "use strict";
      $('.sakura-falling').sakura('start', {
        blowAnimations: [
            'blow-soft-left'
        
        ],                   // Horizontal movement animation names
        className: 'sakura', // Class name to use
        fallSpeed: 2.5,        // Factor for petal fall speed
        maxSize: 12,         // Maximum petal size
        minSize: 9,          // Minimum petal size
        newOn: 250,          // Interval after which a new petal is added
        
    });

})(jQuery);

$(document).on('click', function(){
    document.getElementById("my_audio").play();
    console.log('Shaadi me zaroor aana');
});

// Set the date we're counting down to
var countDownDate = new Date("Feb 14, 2021 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("time").innerHTML = "<div class='container'><div class='days block'>"+ days + "<br>Days</div>" + "<div class='hours block'>" + hours + "<br>Hours</div>" + "<div class='minutes block'>" + minutes + "<br>Minutes</div>" + "<div class='seconds block'>" + seconds + "<br>Seconds</div></div>";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time").innerHTML = "Wedding Completed !!";
    }
}, 1000);

// being a bit cool :p  
var styles = [
    'background: linear-gradient(#D33106, #571402)'
    , 'border: 4px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 2px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 40px'
    , 'text-align: center'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

var styles1 = [
    'color: #FF6C37'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 1)'
    , 'line-height: 40px'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

var styles2 = [
    'color: teal'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 1)'
    , 'line-height: 40px'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

console.log('\n\n%c SAVE THE DATE: 14th Feb, 2021', styles);

console.log('%cYour presence is requested!%c\n\nRegards: Sarthak Jain', styles1, styles2);

console.log(
    `%cShaadi me zaroor aana!\n\n`,
    'color: yellow; background:tomato; font-size: 24pt; font-weight: bold',
)


function HoverCarousel( elm, settings ){
    this.DOM = {
      scope: elm,
      wrap: elm.querySelector('ul').parentNode
    }
    
    this.containerWidth = 0;
    this.scrollWidth = 0;
    this.posFromLeft = 0;    // Stripe position from the left of the screen
    this.stripePos = 0;    // When relative mouse position inside the thumbs stripe
    this.animated = null;
    this.callbacks = {}
    
    this.init()
  }
  
  HoverCarousel.prototype = {
    init(){
      this.bind()
    },
    
    destroy(){
      this.DOM.scope.removeEventListener('mouseenter', this.callbacks.onMouseEnter)
      this.DOM.scope.removeEventListener('mousemove', this.callbacks.onMouseMove)
    },
  
    bind(){
      this.callbacks.onMouseEnter = this.onMouseEnter.bind(this)
      this.callbacks.onMouseMove = e => {
        if( this.mouseMoveRAF ) 
          cancelAnimationFrame(this.mouseMoveRAF)
  
        this.mouseMoveRAF = requestAnimationFrame(this.onMouseMove.bind(this, e))
      }
      
      this.DOM.scope.addEventListener('mouseenter', this.callbacks.onMouseEnter)
      this.DOM.scope.addEventListener('mousemove', this.callbacks.onMouseMove)
    },
    
    // calculate the thumbs container width
    onMouseEnter(e){
      this.nextMore = this.prevMore = false // reset
  
      this.containerWidth       = this.DOM.wrap.clientWidth;
      this.scrollWidth          = this.DOM.wrap.scrollWidth; 
      // padding in percentage of the area which the mouse movement affects
      this.padding              = 0.2 * this.containerWidth; 
      this.posFromLeft          = this.DOM.wrap.getBoundingClientRect().left;
      var stripePos             = e.pageX - this.padding - this.posFromLeft;
      this.pos                  = stripePos / (this.containerWidth - this.padding*2);
      this.scrollPos            = (this.scrollWidth - this.containerWidth ) * this.pos;
  
      // temporary add smoothness to the scroll 
      this.DOM.wrap.style.scrollBehavior = 'smooth';
      
      if( this.scrollPos < 0 )
        this.scrollPos = 0;
      
      if( this.scrollPos > (this.scrollWidth - this.containerWidth) )
        this.scrollPos = this.scrollWidth - this.containerWidth
  
      this.DOM.wrap.scrollLeft = this.scrollPos
      this.DOM.scope.style.setProperty('--scrollWidth',  (this.containerWidth / this.scrollWidth) * 100 + '%');
      this.DOM.scope.style.setProperty('--scrollLleft',  (this.scrollPos / this.scrollWidth ) * 100 + '%');
  
      // lock UI until mouse-enter scroll is finihsed, after aprox 200ms
      clearTimeout(this.animated)
      this.animated = setTimeout(() => {
        this.animated = null
        this.DOM.wrap.style.scrollBehavior = 'auto';
      }, 200)
  
      return this
    },
  
    // move the stripe left or right according to mouse position
    onMouseMove(e){
      // don't move anything until inital movement on 'mouseenter' has finished
      if( this.animated ) return
  
      this.ratio = this.scrollWidth / this.containerWidth
      
      // the mouse X position, "normalized" to the carousel position
      var stripePos = e.pageX - this.padding - this.posFromLeft 
      
      if( stripePos < 0 )
          stripePos = 0
  
      // calculated position between 0 to 1
      this.pos = stripePos / (this.containerWidth - this.padding*2) 
      
      // calculate the percentage of the mouse position within the carousel
      this.scrollPos = (this.scrollWidth - this.containerWidth ) * this.pos 
  
      this.DOM.wrap.scrollLeft = this.scrollPos
      
      // update scrollbar
      if( this.scrollPos < (this.scrollWidth - this.containerWidth) )
        this.DOM.scope.style.setProperty('--scrollLleft',  (this.scrollPos / this.scrollWidth ) * 100 + '%');
  
      // check if element has reached an edge
      this.prevMore = this.DOM.wrap.scrollLeft > 0
      this.nextMore = this.scrollWidth - this.containerWidth - this.DOM.wrap.scrollLeft > 5
      
      this.DOM.scope.setAttribute('data-at',
        (this.prevMore  ? 'left ' : ' ')
        + (this.nextMore ? 'right' : '')
      )
    }
  }
             
  var carouselElm = document.querySelector('.carousel')
  new HoverCarousel(carouselElm)                          

