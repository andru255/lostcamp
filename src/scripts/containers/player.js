$.c.Player = function(){};
$.c.Player.prototype.init = function(ctx){
    this.ctx = ctx;
    //this.x = $.global.MainWidth() / 2;
    //this.y = $.global.MainHeight() / 2;
    this.x = 0;
    this.y = 0;
    this.w = 50;
    this.h = 50;

    this.speed = (200 / 30);
    this.shape = new FixtureSquare(
        this.x, 
        this.y,
        this.w,
        this.h
    );
    this.shape.fillStyle = "#f0f";
    this.tX = false;
    this.tY = false;
    this.bindEvt();
};

$.c.Player.prototype.bindEvt = function(){
    /*
    var mousePosition = $.global.MainC().mousePosition();
    var that = this;
    $.global.MainEC.addEventListener("mousedown", (evt) => {
        this.tX = mousePosition.x; 
        this.tY = mousePosition.y;
    }, false);
    */
    document.addEventListener("keydown", (evt)=>{
        if(evt.key == "ArrowLeft"){
            this.x -= this.speed;
        } else if(evt.key == "ArrowRight"){
            this.x += this.speed;
        }
        if(evt.key == "ArrowUp"){
            this.y -= this.speed;
        } else if(evt.key == "ArrowDown"){
            this.y += this.speed;
        }
    });
};

$.c.Player.prototype.translate = function(aX, aY, tX, tY){
    if(tX && tY){
        var dX = tX - aX;
        var dY = tY - aY;
        var vX = dX * 0.03;
        var vY = dY * 0.03;
        this.x += vX;
        this.y += vY;
    }
};

$.c.Player.prototype.update = function(floorWidth, floorHeight){
    var edges = {
        LEFT  : this.x - (this.w / 2) < 0,
        RIGHT : this.x + (this.w / 2) > floorWidth,
        TOP   : this.y - (this.h / 2) < 0,
        BOTTOM: this.y + (this.h / 2) > floorHeight
    };
    if(edges.LEFT){
        this.x = this.w / 2;
    } else if(edges.RIGHT){
        this.x = floorWidth - (this.w / 2);
    }
    if(edges.TOP){
        this.y = this.h / 2;
    } else if(edges.BOTTOM){
        this.y = floorHeight - (this.h / 2);
    }
};

$.c.Player.prototype.render = function(xView, yView){
    var x = (this.x - (this.w/2)) - xView;
    var y = (this.y - (this.h/2)) - yView;
    this.shape.updateFeatures(x, y);
    this.shape.draw(this.ctx);
};