var DOM = function(elementName, type, tagToCreate, target){
    this.elementName = elementName;
    this.type = type || "#";
    this.tagToCreate = tagToCreate || "div";
    this.target = target || document.body;
    var elem = this.target.querySelector([ 
        this.tagToCreate, 
        this.type, 
        this.elementName 
    ].join(""));
    this.selfie = false;
    if ( elem ){
        this.selfie = elem;
    }
    return this._make()
};
DOM.prototype._make = function(){
    if( !this.selfie ){
        this.selfie = document.createElement(this.tagToCreate);
        this.target.appendChild(this.selfie);
        if(this.type == "."){ this.selfie.className = this.elementName }
        if(this.type == "#"){ this.selfie.id = this.elementName }
    }
    return this
};
DOM.prototype.remove = function(){
    this.target.removeChild(this.selfie);
};
DOM.prototype.styles = function(obj){
    for(var key in obj){
        this.selfie.style[key] = obj[key]
    }
    return this;
};
DOM.prototype.transform = function(key, value){
    var value = key + '(' + value + ')';
    this.styles({
        "webkitTransform": value,
        "MozTransform"   : value,
        "OTransform": value,
        "transform": value
    });
    return this;
};
DOM.prototype.position = function(x, y){
    var Xos = arguments[2] ? 0 : this.selfie.width / 2;
    var Yos = arguments[2] ? 0 : this.selfie.height / 2;
    this.styles({
        left: ( x - Xos) + 'px',
        top: ( y - Yos) + 'px'
    });
    this.x = x;
    this.y = y;
    return this;
};
DOM.prototype.dimention = function(w, h){
    this.styles({
        width: ( w ) + 'px',
        height: ( h ) + 'px'
    });
    this.width = w;
    this.height = h;
    return this;
};
DOM.prototype.captureTouch = function(){
    var data = {
        x: null,
        y: null,
        isPressed: false,
        event: null
    };
    var bodyScrollLeft = document.body.scrollLeft;
    var elScrollLeft   = document.documentElement.scrollLeft;
    var bodyScrollTop  = document.body.scrollTop;
    var elScrollTop    = document.documentElement.scrollTop;
    var offsetLeft     = this.selfie.offsetLeft;
    var offsetTop      = this.selfie.offsetTop;

    this.selfie.addEventListener('touchstart', function(evt){
        data.isPressed = true;
        data.event = evt;
    }, false);

    this.selfie.addEventListener('touchend', function(evt){
        data.isPressed = false;
        data.x = null;
        data.y = null;
        data.event = evt;
    }, false);

    this.selfie.addEventListener('touchmove', function(evt){
        var x,
            y,
            touched = evt.touches[0]; //first touch
        if(touched.pageX || touched.pageY){
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