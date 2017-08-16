var FixtureCircle = function(x, y, radius){
    this.radius = radius;
    this.x = x;
    this.y = y;
};
FixtureCircle.prototype = new Fixture.prototype.constructor;
FixtureCircle.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};