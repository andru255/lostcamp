var HORDES = 3;
// ENUMS CONTROLS
var KEYS = {
    UP: 38,
    DOWN: 40,
    SPACE: 32
};
var player = new ContainerPlayer();
var miniMap = new ContainerMinimap();
/* start init fns*/
var GAME_INIT = function GAME_INIT() {
    // core - elements
    window.MAIN_EL_CANVAS = new DOM("main", false, "canvas").selfie;
    window.MAIN_CANVAS = new CANVAS(MAIN_EL_CANVAS);
    window.MAIN_CONTEXT = MAIN_CANVAS.getCtx();

    window.MINIMAP_EL_CANVAS = new DOM("minimap", false, "canvas").selfie;
    window.MINIMAP_CANVAS = new CANVAS(MINIMAP_EL_CANVAS);
    window.MINIMAP_CONTEXT = MINIMAP_CANVAS.getCtx();

    //core - dimentions
    window.MAIN_CANVAS_WIDTH = MAIN_EL_CANVAS.width;
    window.MAIN_CANVAS_HEIGHT = MAIN_EL_CANVAS.height;
    window.MINIMAP_CANVAS_WIDTH = MINIMAP_EL_CANVAS.width;
    window.MINIMAP_CANVAS_HEIGHT = MINIMAP_EL_CANVAS.height;

    // BOUNDS
    window.MAIN_CANVAS_BOUNDS = {
        TOP: 0,
        LEFT: 0,
        RIGHT: MAIN_CANVAS_WIDTH,
        BOTTOM: MAIN_CANVAS_HEIGHT
    };
    player.init(MAIN_CONTEXT);
    miniMap.init(MINIMAP_CONTEXT);
};
/* start render fns*/
function GAME_RENDER() {
    player.render();
    miniMap.render();
};
/* end render fns*/
setTimeout(function () {
    GAME_INIT();
    MAIN_CANVAS.fpf(function (step) {
        MAIN_CANVAS.clean();
        GAME_RENDER();
    });
}, 0);

function ContainerMinimap() {};
ContainerMinimap.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.x = MINIMAP_CANVAS_WIDTH / 2;
    this.y = MINIMAP_CANVAS_HEIGHT / 2;
    this.shape = new FixtureSquare(this.x, this.y, 20, 20);
    this.shape.style = "transparent";
    this.shape.lineWidth = 2;
    this.shape.stroke = "blue";
};
ContainerMinimap.prototype.render = function () {
    this.shape.draw(this.ctx);
};
function ContainerPlayer() {};
ContainerPlayer.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.x = MAIN_CANVAS_WIDTH / 2;
    this.y = MAIN_CANVAS_HEIGHT / 2;
    this.shape = new FixtureSquare(this.x, this.y, 50, 50);
    this.tX = false;
    this.tY = false;
    this.bindEvents();
};
ContainerPlayer.prototype.bindEvents = function () {
    var _this = this;

    var offsetLeft = MAIN_EL_CANVAS.offsetLeft;
    var offsetTop = MAIN_EL_CANVAS.offsetTop;
    var that = this;

    MAIN_EL_CANVAS.addEventListener("click", function (evt) {
        //this.shape.x = evt.pageX - offsetLeft;
        //this.shape.y = evt.pageY - offsetTop;
        _this.tX = evt.pageX - offsetLeft;
        _this.tY = evt.pageY - offsetTop;
    }, false);
};

ContainerPlayer.prototype.translate = function (aX, aY, tX, tY) {
    if (tX && tY) {
        var dX = tX - aX;
        var dY = tY - aY;
        var vX = dX * 0.03;
        var vY = dY * 0.03;
        this.shape.x += vX;
        this.shape.y += vY;
    }
};
ContainerPlayer.prototype.render = function () {
    this.translate(this.shape.x, this.shape.y, this.tX, this.tY);
    this.shape.draw(this.ctx);
};
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
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 17 /*~ 1000/60*/);
    };
}

/**
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame || window.clearTimeout;
}
var CANVAS = function CANVAS(element) {
    this.selfie = element;
};
CANVAS.prototype.getCtx = function () {
    return this.selfie.getContext("2d");
};
CANVAS.prototype.clean = function () {
    this.getCtx().clearRect(0, 0, this.selfie.width, this.selfie.height);
};
CANVAS.prototype.cancelAnimFrame = function () {
    window.cancelAnimationFrame(this.sfpf);
};
//fpf = FramePerFrame
//sfpf = StepFramePerFrame
CANVAS.prototype.fpf = function (onStep) {
    var that = this;
    (function step() {
        that.sfpf = window.requestAnimationFrame(step, that.selfie);
        onStep && onStep.call(this, step);
    })();
};
var DOM = function DOM(elementName, type, tagToCreate, target) {
    this.elementName = elementName;
    this.type = type || "#";
    this.tagToCreate = tagToCreate || "div";
    this.target = target || document.body;
    var elem = this.target.querySelector([this.tagToCreate, this.type, this.elementName].join(""));
    this.selfie = false;
    if (elem) {
        this.selfie = elem;
    }
    return this._make();
};
DOM.prototype._make = function () {
    if (!this.selfie) {
        this.selfie = document.createElement(this.tagToCreate);
        this.target.appendChild(this.selfie);
        if (this.type == ".") {
            this.selfie.className = this.elementName;
        }
        if (this.type == "#") {
            this.selfie.id = this.elementName;
        }
    }
    return this;
};
DOM.prototype.remove = function () {
    this.target.removeChild(this.selfie);
};
DOM.prototype.styles = function (obj) {
    for (var key in obj) {
        this.selfie.style[key] = obj[key];
    }
    return this;
};
DOM.prototype.transform = function (key, value) {
    var value = key + '(' + value + ')';
    this.styles({
        "webkitTransform": value,
        "MozTransform": value,
        "OTransform": value,
        "transform": value
    });
    return this;
};
DOM.prototype.position = function (x, y) {
    var Xos = arguments[2] ? 0 : this.selfie.width / 2;
    var Yos = arguments[2] ? 0 : this.selfie.height / 2;
    this.styles({
        left: x - Xos + 'px',
        top: y - Yos + 'px'
    });
    this.x = x;
    this.y = y;
    return this;
};
DOM.prototype.dimention = function (w, h) {
    this.styles({
        width: w + 'px',
        height: h + 'px'
    });
    this.width = w;
    this.height = h;
    return this;
};
DOM.prototype.captureTouch = function () {
    var data = {
        x: null,
        y: null,
        isPressed: false,
        event: null
    };
    var bodyScrollLeft = document.body.scrollLeft;
    var elScrollLeft = document.documentElement.scrollLeft;
    var bodyScrollTop = document.body.scrollTop;
    var elScrollTop = document.documentElement.scrollTop;
    var offsetLeft = this.selfie.offsetLeft;
    var offsetTop = this.selfie.offsetTop;

    this.selfie.addEventListener('touchstart', function (evt) {
        data.isPressed = true;
        data.event = evt;
    }, false);

    this.selfie.addEventListener('touchend', function (evt) {
        data.isPressed = false;
        data.x = null;
        data.y = null;
        data.event = evt;
    }, false);

    this.selfie.addEventListener('touchmove', function (evt) {
        var x,
            y,
            touched = evt.touches[0]; //first touch
        if (touched.pageX || touched.pageY) {
            x = touched.pageX;
            y = touched.pageY;
        } else {
            x = touched.clientX + bodyScrollLeft + elScrollLeft;
            y = touched.clientY + bodyScrollTop + elScrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;
        data.event = evt;
    }, false);

    return touched;
};
function Fixture() {
    this.velocityX = 0;
    this.velocityY = 0;
    this.velocityZ = 0;
    this.friction = 0;
    this.debug = true;
}
Fixture.prototype.fillAndStroke = function (ctx) {
    ctx.fillStyle = this.style || false;
    ctx.fill();
    if (this.lineWidth > 0) {
        ctx.strokeStyle = this.stroke || false;
        ctx.lineWidth = this.lineWidth || 0;
    }
    ctx.stroke();
    this.debug && this.showDebugMode(ctx);
};
Fixture.prototype.showDebugMode = function (ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = "#00ff00";
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
};
var FixtureCircle = function FixtureCircle(x, y, radius) {
    this.radius = radius;
    this.x = x;
    this.y = y;
};
FixtureCircle.prototype = new Fixture.prototype.constructor();
FixtureCircle.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};
var FixturePolygon = function FixturePolygon(x, y, vertices) {
    this.x = x;
    this.y = y;
    this.vertices = vertices || [{ x: 10, y: 10 }];
};
FixturePolygon.prototype = new Fixture.prototype.constructor();
FixturePolygon.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    this.vertices.map(function (element) {
        ctx.lineTo(element.x, element.y);
    });
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};
var FixtureSquare = function FixtureSquare(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w || 10;
    this.h = h || 10;
};
FixtureSquare.prototype = new Fixture.prototype.constructor();
FixtureSquare.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};