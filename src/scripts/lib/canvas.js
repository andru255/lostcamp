/* global polifills */
/**
 * Normalize the browser animation API across implementations. This requests
 * the browser to schedule a repaint of the window for the next animation frame.
 * Checks for cross-browser support, and, failing to find it, falls back to setTimeout.
 * @param {function}    callback  Function to call when it's time to update your animation for the next repaint.
 * @param {HTMLElement} element   Optional parameter specifying the element that visually bounds the entire animation.
 * @return {number} Animation frame request.
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  function (callback) {
                                    return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                  });
}

/**
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}
var CANVAS = function(element){
    this.selfie = element
};
CANVAS.prototype.getCtx = function(){
    return this.selfie.getContext("2d")
};
CANVAS.prototype.clean = function(){
    this.getCtx().clearRect(0, 0, this.selfie.width, this.selfie.height)
};
CANVAS.prototype.cancelAnimFrame = function(){
    window.cancelAnimationFrame(this.sfpf)
};
//fpf = FramePerFrame
//sfpf = StepFramePerFrame
CANVAS.prototype.fpf = function(onStep){
    var that = this;
    (function step(){
        that.sfpf = window.requestAnimationFrame(step, that.selfie)
        onStep && onStep.call(this, step)
    })()
};
CANVAS.prototype.mousePosition = function(){
    var mouse = {x: 0, y:0, event:null};
    var bodyScroll = {
        left: document.body.scrollLeft,
        top: document.body.scrollTop,
    };
    var documentEl = {
        left: document.documentElement.scrollLeft,
        top: document.documentElement.scrollTop
    };
    var offsetLeftEl = this.selfie.offsetLeft;
    var offsetTopEl = this.selfie.offsetTop;

    this.selfie.addEventListener('mousemove', function(evt){
        var x;
        var y;
        if(event.pageX || event.pageY){
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + bodyScroll.left + documentEl.scrollLeft;
            y = event.clientX + bodyScroll.left + documentEl.scrollLeft;
        }
        x -= offsetLeftEl;
        y -= offsetTopEl;
        mouse.x = x;
        mouse.y = y;
        mouse.event = evt;
    }, false);

    return mouse;
}