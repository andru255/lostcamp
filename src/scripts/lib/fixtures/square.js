var FixtureSquare = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w || 10;
    this.h = h || 10;
    this.right = this.x + this.w;
    this.bottom = this.y + this.h;
};
FixtureSquare.prototype = new Fixture.prototype.constructor;
FixtureSquare.prototype.updateFeatures = function(x, y){
    this.x = x;
    this.y = y;
    this.right = (this.x + this.w);
    this.bottom = (this.y + this.h);
};
FixtureSquare.prototype.within = function(obj){
    var enumObj = {
        LEFT  : obj.x      <= this.x,
        RIGHT : obj.right  >= this.right,
        TOP   : obj.y      <= this.y,
        BOTTOM: obj.bottom >= this.bottom
    };
    return (
        enumObj.LEFT  &&
        enumObj.RIGHT &&
        enumObj.TOP   &&
        enumObj.BOTTOM
    );
}
FixtureSquare.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h)
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};