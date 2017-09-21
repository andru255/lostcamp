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
    var that = this;

    var bodyScroll = {
        left: document.body.scrollLeft,
        top: document.body.scrollTop,
    };
    var documentEl = {
        left: document.documentElement.scrollLeft,
        top: document.documentElement.scrollTop
    };
    var offsetLeftEl = this.selfie.getBoundingClientRect().left;
    var offsetTopEl = this.selfie.getBoundingClientRect().top;

    this.selfie.addEventListener('mousemove', function(evt){
        var mouseX = evt.clientX - offsetLeftEl + window.pageXOffset; 
        var mouseY = evt.clientY - offsetTopEl + window.pageYOffset; 

        const bounds = that.selfie.getBoundingClientRect();
        mouseX = (mouseX / bounds.width) * that.selfie.width; 
        mouseY = (mouseY / bounds.height) * that.selfie.height; 

        mouse.x = mouseX;
        mouse.y = mouseY;
        mouse.event = evt;
    }, false);

    return mouse;
}