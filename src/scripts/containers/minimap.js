$.c.MiniMap = function(){};
$.c.MiniMap.prototype.init = function(ctx){
    this.ctx = ctx;
    this.x = $.global.MiniWidth() / 2;
    this.y = $.global.MiniHeight() / 2;
    this.shape = new FixtureSquare(
        this.x, 
        this.y,
        20,
        20
    );
    this.shape.style = "transparent";
    this.shape.lineWidth = 2;
    this.shape.strokeStyle = "blue";
};
$.c.MiniMap.prototype.render = function(){
    this.shape.draw(this.ctx);
};