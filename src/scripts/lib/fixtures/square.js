var FixtureSquare = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w || 10;
    this.h = h || 10;
};
FixtureSquare.prototype = new Fixture.prototype.constructor;
FixtureSquare.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h)
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};