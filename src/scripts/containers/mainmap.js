$.c.MainMap = function(){};
$.c.MainMap.prototype.init = function(ctx){
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    //for debug
    this.grid = new GRID(1000, 1000);
    this.grid.generate();
};
$.c.MainMap.prototype.bindEvt = function(){
    var mousePosition = $.global.MainC().mousePosition();
    $.global.MainEC.addEventListener("mousemove", function(){
        var sides = {
            left: $.global.MainCBounds.l() + 100 > mousePosition.x && mousePosition.x > 0,
            right: $.global.MainCBounds.r() - 100 < mousePosition.x,
            top: $.global.MainCBounds.t() + 100 > mousePosition.y && mousePosition.y > 0,
            bottom: $.global.MainCBounds.b() - 100 < mousePosition.y
        };
        if(sides.left){
            console.log("<-");
        } else if(sides.right){
            console.log("->");
        }
        if(sides.top){
            console.log("^\n|");
        } else if(sides.bottom){
            console.log("|\nv");
        }
    });
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
    this.grid.render(this.ctx);
    //this.shape.draw(this.ctx);
};