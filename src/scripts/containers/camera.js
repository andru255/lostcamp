$.c.Camera = function(){};
$.c.Camera.prototype.init = function(ctx){
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    // for debug
};
$.c.Camera.prototype.setup = function(xView, yView, canvasWidth, canvasHeight, floorWidth, floorHeight){
    //Camera position
    this.xView = xView || 0;
    this.yView = yView || 0;
    //Distance
    this.xMinDistance = 0;
    this.yMinDistance = 0;
    //Viewport dimentions
    this.widthView = canvasWidth;
    this.heightView = canvasHeight;
    //object to follow
    this.followed = null;

    //rectangle to represent viewport?
    this.viewPortRect = new FixtureSquare(
        this.xView,
        this.yView,
        this.widthView,
        this.heightView
    );
    //rectangle to represent floor?
    this.floorRect = new FixtureSquare(
        0,
        0,
        floorWidth,
        floorHeight
    );
};
$.c.Camera.prototype.follow = function(objToFollow, xMinDistance, yMinDistance){
    this.followed = objToFollow;
    this.xMinDistance = xMinDistance;
    this.yMinDistance = yMinDistance;
};
$.c.Camera.prototype.update = function(){
    if(this.followed){
        //left <-> right
        if(this.followed.x - this.xView + this.xMinDistance > this.widthView){
            this.xView = this.followed.x - (this.widthView - this.xMinDistance);
        } else if(this.followed.x - this.xMinDistance < this.xView){
            this.xView = this.followed.x - this.xMinDistance;
        }
    }
    //update viewport position
    //this.viewPortRect.set(...)

    //don't let the camera the floor's boundary
    //if(!this.viewPortRect.within..)
};
