$.c.Player = function(){};
$.c.Player.prototype.init = function(ctx){
    this.ctx = ctx;
    this.x = $.global.MainWidth() / 2;
    this.y = $.global.MainHeight() / 2;
    this.shape = new FixtureSquare(
        this.x, 
        this.y,
        50,
        50
    );
    this.tX = false;
    this.tY = false;
    this.bindEvt();
};
$.c.Player.prototype.bindEvt = function(){
    var mousePosition = $.global.MainC().mousePosition();
    var that = this;

    $.global.MainEC.addEventListener("mousedown", (evt) => {
        console.log(`x: ${mousePosition.x}, y: ${mousePosition.y}`);
        //this.shape.x = mousePosition.x;
        //this.shape.y = mousePosition.y;
        this.tX = mousePosition.x; 
        this.tY = mousePosition.y;
    }, false);
};

$.c.Player.prototype.translate = function(aX, aY, tX, tY){
    if(tX && tY){
        var dX = tX - aX;
        var dY = tY - aY;
        var vX = dX * 0.03;
        var vY = dY * 0.03;
        this.shape.x += vX;
        this.shape.y += vY;
    }
};
$.c.Player.prototype.render = function(){
    this.translate(this.shape.x, this.shape.y, this.tX, this.tY);
    this.shape.draw(this.ctx);
};