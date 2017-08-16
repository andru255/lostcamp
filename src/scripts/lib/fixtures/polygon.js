var FixturePolygon = function(x, y, vertices){
    this.x = x;
    this.y = y;
    this.vertices = vertices || [{x: 10, y: 10}];
};
FixturePolygon.prototype = new Fixture.prototype.constructor;
FixturePolygon.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    this.vertices.map(function(element){
        ctx.lineTo(element.x, element.y);
    });
    this.__proto__.fillAndStroke.call(this, ctx);
    ctx.closePath();
    ctx.restore();
};