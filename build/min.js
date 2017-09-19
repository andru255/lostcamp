var $ = {};
//containers
$.c = {};
$.HORDES = 3;
// ENUMS CONTROLS
$.KEYS = {
    UP: 38,
    DOWN: 40,
    SPACE: 32
};
/* start init fns*/
$.init = function () {
    // core - elements
    $.global = {
        //elements
        MainEC: new DOM("main", false, "canvas").selfie,
        MainC: function MainC() {
            return new CANVAS($.global.MainEC);
        },
        MainCtx: function MainCtx() {
            return $.global.MainC().getCtx();
        },
        MiniEC: new DOM("minimap", false, "canvas").selfie,
        MiniC: function MiniC() {
            return new CANVAS($.global.MiniEC);
        },
        MiniCtx: function MiniCtx() {
            return $.global.MiniC().getCtx();
        },
        //dimentions
        MainWidth: function MainWidth() {
            return $.global.MainEC.width;
        },
        MainHeight: function MainHeight() {
            return $.global.MainEC.height;
        },
        MiniWidth: function MiniWidth() {
            return Math.floor($.global.MainWidth() * 0.1);
        },
        MiniHeight: function MiniHeight() {
            return Math.floor($.global.MainHeight() * 0.1);
        },
        MainCBounds: {
            t: function t() {
                return 0;
            },
            l: function l() {
                return 0;
            },
            r: function r() {
                return $.global.MainWidth();
            },
            b: function b() {
                return $.global.MainHeight();
            }
        }
    };
    $.fs = [];
    $.i = {};

    (function (main, mini) {
        $.i.main = new $.c.MainMap();
        $.i.main.init(main);
        //factories
        var numfactories = 10;
        var j = 100;
        for (var i = 0; i < numfactories; i++) {
            $.i.f = new $.c.Factory();
            $.i.f.init(j, j, main);
            $.fs.push($.i.f);
            j += 100;
        }
        $.i.p = new $.c.Player();
        $.i.p.init(main);
        //$.i.mini = new $.c.MiniMap();
        //$.i.mini.init(mini);
    })($.global.MainCtx(), $.global.MiniCtx());
};
/* start render fns*/
$.render = function () {
    $.i.main.render();
    $.fs.map(function (f) {
        return f.render();
    });
    $.i.p.render();
    //$.i.mini.render();
};
/* end render fns*/
setTimeout(function () {
    $.init();
    $.global.MainC().fpf(function (step) {
        $.global.MainC().clean();
        $.render();
    });
}, 0);
$.c.Factory = function () {};
$.c.Factory.prototype.init = function (x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.shape = new FixtureSquare(this.x, this.y, 20, 20);
    this.shape.style = "#df0";
    this.shape.lineWidth = 2;
    this.shape.strokeStyle = "blue";
};
$.c.Factory.prototype.render = function () {
    this.shape.draw(this.ctx);
};
$.c.MainMap = function () {};
$.c.MainMap.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.shape = new FixtureSquare(this.x, this.y, 1000, 1000);
    var grd = this.ctx.createLinearGradient(0, 0, 1000, 0);
    grd.addColorStop(0, "orange");
    grd.addColorStop(1, "#d0f");
    this.shape.style = grd;
    this.shape.lineWidth = 2;
    this.shape.strokeStyle = "blue";
    //this.ctx.translate(-500, -500);
};
$.c.MainMap.prototype.listen = function (objs) {
    var player = objs.player;
    var pposX = -1 * (player.shape.x - $.global.MainWidth() / 2);
    if (pposX < -100) {
        pposX = -600;
    } else if (pposX > 0) {
        pposX = 0;
    }
    this.shape.x = pposX;
};
$.c.MainMap.prototype.render = function () {
    this.shape.draw(this.ctx);
};
$.c.MiniMap = function () {};
$.c.MiniMap.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.x = $.global.MiniWidth() / 2;
    this.y = $.global.MiniHeight() / 2;
    this.shape = new FixtureSquare(this.x, this.y, 20, 20);
    this.shape.style = "transparent";
    this.shape.lineWidth = 2;
    this.shape.strokeStyle = "blue";
};
$.c.MiniMap.prototype.render = function () {
    this.shape.draw(this.ctx);
};
$.c.Player = function () {};
$.c.Player.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.x = $.global.MainWidth() / 2;
    this.y = $.global.MainHeight() / 2;
    this.shape = new FixtureSquare(this.x, this.y, 50, 50);
    this.tX = false;
    this.tY = false;
    this.bindEvt();
};
$.c.Player.prototype.bindEvt = function () {
    var _this = this;

    var mousePosition = $.global.MainC().mousePosition();
    var that = this;

    $.global.MainEC.addEventListener("click", function (evt) {
        //this.shape.x = mousePosition.x;
        //this.shape.y = mousePosition.y;
        _this.tX = mousePosition.x;
        _this.tY = mousePosition.y;
    }, false);
};

$.c.Player.prototype.translate = function (aX, aY, tX, tY) {
    if (tX && tY) {
        var dX = tX - aX;
        var dY = tY - aY;
        var vX = dX * 0.03;
        var vY = dY * 0.03;
        this.shape.x += vX;
        this.shape.y += vY;
    }
};
$.c.Player.prototype.render = function () {
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
CANVAS.prototype.mousePosition = function () {
    var mouse = { x: 0, y: 0, event: null };
    var bodyScroll = {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    };
    var documentEl = {
        left: document.documentElement.scrollLeft,
        top: document.documentElement.scrollTop
    };
    var offsetLeftEl = this.selfie.offsetLeft;
    var offsetTopEl = this.selfie.offsetTop;

    this.selfie.addEventListener('mousemove', function (evt) {
        var x;
        var y;
        if (event.pageX || event.pageY) {
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
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    //friction
    this.fr = 0;
    this.debug = true;
}
Fixture.prototype.fillAndStroke = function (ctx) {
    ctx.fillStyle = this.style || false;
    ctx.fill();
    if (this.lineWidth > 0) {
        ctx.strokeStyle = this.strokeStyle || false;
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
var FixtureCircle = function FixtureCircle(x, y, r) {
    this.r = r;
    this.x = x;
    this.y = y;
};
FixtureCircle.prototype = new Fixture.prototype.constructor();
FixtureCircle.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};
var FixturePolygon = function FixturePolygon(x, y, vs) {
    this.x = x;
    this.y = y;
    this.vs = vs || [{ x: 10, y: 10 }];
};
FixturePolygon.prototype = new Fixture.prototype.constructor();
FixturePolygon.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    this.vertices.map(function (e) {
        ctx.lineTo(e.x, e.y);
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