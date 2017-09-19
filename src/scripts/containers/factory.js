$.c.Factory = function (){};
$.c.Factory.prototype.init = function(x, y, ctx){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.shape = new FixtureSquare(
        this.x, 
        this.y,
        20,
        20
    );
    this.shape.style = "#df0";
    this.shape.lineWidth = 2;
    this.shape.strokeStyle = "blue";
};
$.c.Factory.prototype.render = function(){
    this.shape.draw(this.ctx);
};