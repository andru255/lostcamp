var FixturePolygon = function(x, y, vs){
    this.x = x;
    this.y = y;
    this.vs = vs || [{x: 10, y: 10}];
};
FixturePolygon.prototype = new Fixture.prototype.constructor;
FixturePolygon.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    this.vertices.map(function(e){
        ctx.lineTo(e.x, e.y);
    });
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};