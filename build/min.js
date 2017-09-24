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
        $.i.main.bindEvt();

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
    //$.fs.map((f) => f.render())
    //$.i.p.render();
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
$.c.Camera = function () {};
$.c.Camera.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    // for debug
};
$.c.Camera.prototype.setup = function (xView, yView, canvasWidth, canvasHeight, floorWidth, floorHeight) {
    //Camera position
    this.xView = xView || 0;
    this.yView = yView || 0;
    //Distance
    this.xMinDistance = 0;
    this.yMinDistance = 0;
    //Viewport dimentions
    this.widthView = canvasWidth;
    this.heightView = canvasHeight;
    //object to follow
    this.followed = null;

    //rectangle to represent viewport?
    this.viewPortRect = new FixtureSquare(this.xView, this.yView, this.widthView, this.heightView);
    //rectangle to represent floor?
    this.floorRect = new FixtureSquare(0, 0, floorWidth, floorHeight);
};
$.c.Camera.prototype.follow = function (objToFollow, xMinDistance, yMinDistance) {
    this.followed = objToFollow;
    this.xMinDistance = xMinDistance;
    this.yMinDistance = yMinDistance;
};
$.c.Camera.prototype.update = function () {
    if (this.followed) {
        //left <-> right
        if (this.followed.x - this.xView + this.xMinDistance > this.widthView) {
            this.xView = this.followed.x - (this.widthView - this.xMinDistance);
        } else if (this.followed.x - this.xMinDistance < this.xView) {
            this.xView = this.followed.x - this.xMinDistance;
        }
    }
    //update viewport position
    //this.viewPortRect.set(...)

    //don't let the camera the floor's boundary
    //if(!this.viewPortRect.within..)
};
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
    //for debug
    this.grid = new GRID(1000, 1000);
    this.grid.generate();
};
$.c.MainMap.prototype.bindEvt = function () {
    var mousePosition = $.global.MainC().mousePosition();
    $.global.MainEC.addEventListener("mousemove", function () {
        var sides = {
            left: $.global.MainCBounds.l() + 100 > mousePosition.x && mousePosition.x > 0,
            right: $.global.MainCBounds.r() - 100 < mousePosition.x,
            top: $.global.MainCBounds.t() + 100 > mousePosition.y && mousePosition.y > 0,
            bottom: $.global.MainCBounds.b() - 100 < mousePosition.y
        };
        if (sides.left) {
            console.log("<-");
        } else if (sides.right) {
            console.log("->");
        }
        if (sides.top) {
            console.log("^\n|");
        } else if (sides.bottom) {
            console.log("|\nv");
        }
    });
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
    this.grid.render(this.ctx);
    //this.shape.draw(this.ctx);
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
    $.global.MainEC.addEventListener("mousedown", function (evt) {
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
    var that = this;

    var bodyScroll = {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    };
    var documentEl = {
        left: document.documentElement.scrollLeft,
        top: document.documentElement.scrollTop
    };
    var offsetLeftEl = this.selfie.getBoundingClientRect().left;
    var offsetTopEl = this.selfie.getBoundingClientRect().top;

    this.selfie.addEventListener('mousemove', function (evt) {
        var mouseX = evt.clientX - offsetLeftEl + window.pageXOffset;
        var mouseY = evt.clientY - offsetTopEl + window.pageYOffset;

        var bounds = that.selfie.getBoundingClientRect();
        mouseX = mouseX / bounds.width * that.selfie.width;
        mouseY = mouseY / bounds.height * that.selfie.height;

        mouse.x = mouseX;
        mouse.y = mouseY;
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
var GRID = function GRID(width, height) {
    this.width = width;
    this.height = height;
};
GRID.prototype.generate = function () {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;
    this._createColumns(ctx, 100);
    this._createRows(ctx, 100);
    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");
};
GRID.prototype.render = function (contextTarget) {
    contextTarget.drawImage(this.image, 0, 0);
};
GRID.prototype._newPath = function (ctx, onNewPath) {
    ctx.save();
    ctx.beginPath();
    onNewPath.call(this);
    ctx.closePath();
    ctx.restore();
};
GRID.prototype._createPoint = function (options) {
    var ctx = options.context;
    var textForDebug = "";
    if (typeof options.debug === "boolean" && options.debug) {
        textForDebug = "x: " + options.x + ", y: " + options.y;
    }
    this._newPath(ctx, function () {
        ctx.strokeStyle = options.color || "black";
        ctx.strokeText("." + options.text + " " + (textForDebug ? "|${textForDebug}" : ""), options.x, options.y);
    });
};
GRID.prototype._createVerticalLine = function (ctx, x, y, size) {
    this._createPoint({
        context: ctx,
        x: x,
        y: y + 10,
        color: "#0000ff",
        text: x
    });
    this._newPath(ctx, function () {
        ctx.strokeStyle = "#0000ff";
        ctx.moveTo(x, y);
        ctx.lineTo(x, size);
        ctx.stroke();
    });
};
GRID.prototype._createHorizontalLine = function (ctx, x, y, size) {
    this._createPoint({
        context: ctx,
        x: x,
        y: y,
        color: "#ff0000",
        text: y
    });
    this._newPath(ctx, function () {
        ctx.strokeStyle = "#ff0000";
        ctx.moveTo(x, y);
        ctx.lineTo(size, y);
        ctx.stroke();
    });
};
GRID.prototype._createColumns = function (ctx, columnWidth) {
    var numColumns = Math.ceil(this.width / columnWidth);
    var coordX = 0;
    for (var index = 0; index < numColumns; index++) {
        this._createVerticalLine(ctx, coordX, 0, this.height);
        coordX += columnWidth;
    }
};
GRID.prototype._createRows = function (ctx, rowHeight) {
    var numRows = Math.ceil(this.height / rowHeight);
    var coordY = 0;
    for (var index = 0; index < numRows; index++) {
        this._createHorizontalLine(ctx, 0, coordY, this.width);
        coordY += rowHeight;
    }
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
    this.right = this.x + this.w;
    this.bottom = this.y + this.h;
};
FixtureSquare.prototype = new Fixture.prototype.constructor();
FixtureSquare.prototype.updateFeatures = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w || this.w;
    this.h = h || this.h;
    this.right = this.x + this.w;
    this.bottom = this.y + this.h;
};
FixtureSquare.prototype.within = function (obj) {
    var enumObj = {
        LEFT: obj.x < this.x,
        RIGHT: obj.right < this.right,
        TOP: obj.y < this.bottom,
        BOTTOM: obj.y < this.bottom
    };
    return enumObj.LEFT && enumObj.RIGHT && enumObj.TOP && enumObj.BOTTOM;
};
FixtureSquare.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};