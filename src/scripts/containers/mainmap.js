$.c.MainMap = function(){};
$.c.MainMap.prototype.init = function(ctx){
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.shape = new FixtureSquare(
        this.x, 
        this.y,
        1000,
        1000
    );
    var grd = this.ctx.createLinearGradient(0, 0, 1000, 0);
    grd.addColorStop(0, "orange");
    grd.addColorStop(1, "#d0f");
    this.shape.style = grd;
    this.shape.lineWidth = 2;
    this.shape.strokeStyle = "blue";
    //this.ctx.translate(-500, -500);
};
$.c.MainMap.prototype.listen = function(objs){
    var player = objs.player;
    var pposX = -1 * (player.shape.x - ($.global.MainWidth()/2));
    if(pposX < -100){
        pposX = -600;
    } else if(pposX > 0){
        pposX = 0;
    }
    this.shape.x = pposX;
};
$.c.MainMap.prototype.render = function(){
    this.shape.draw(this.ctx);
};