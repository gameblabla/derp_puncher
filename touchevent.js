$(window).load(function(){
var getPointerEvent = function(event) {
    return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
};
var $touchArea = $('#touchArea'),
    touchStarted = false, // detect if a touch event is sarted
    currX = 0,
    currY = 0,
    cachedX = 0,
    cachedY = 0;

//setting the events listeners
$touchArea.on('touchstart mousedown',function (e){
    e.preventDefault(); 
    var pointer = getPointerEvent(e);
    // caching the current x
    cachedX = currX = pointer.pageX;
    // caching the current y
    cachedY = currY = pointer.pageY;
    // a touch event is detected      
    touchStarted = true;
	mousse = 1;
	
	setTimeout(function (){
        if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
            // Here you get the Tap event
        }
    },10);
	
});
$touchArea.on('touchend mouseup touchcancel',function (e){
    e.preventDefault();
    // here we can consider finished the touch event
    touchStarted = false;
	mousse = 0;
});
$touchArea.on('touchmove mousemove',function (e){
    e.preventDefault();
    var pointer = getPointerEvent(e);
    currX = pointer.pageX;
    currY = pointer.pageY;
	mousex = currX*(480/window.innerWidth);
	mousex = mousex | 0;
	mousey = currY*(320/window.innerHeight);
	mousey = mousey | 0;
});
});//]]> 