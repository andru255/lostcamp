$.c.MainMap = function(){};
$.c.MainMap.prototype.init = function(ctx, floorWidth, floorHeight){
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    //for debug
    this.grid = new GRID(floorWidth, floorHeight);
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
};
$.c.MainMap.prototype.render = function(xView, yView){
    var source = {};
    var distance = {};

    //offset
    source.x = xView;
    source.y = yView;
    source.w = this.ctx.canvas.width;
    source.h = this.ctx.canvas.height;

    distance.x = 0;
    distance.y = 0;
    //cropping the grid image
    if(this.grid.image.width - source.x < source.w){
        source.w = this.grid.image.width - source.x;
    }
    if(this.grid.image.height - source.y < source.h){
        source.h = this.grid.image.height - source.y;
    }

    //location on canvas to draw the cropped image target
    distance.w = source.w;
    distance.h = source.h;
    this.grid.render(this.ctx, source, distance);
};