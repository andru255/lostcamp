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