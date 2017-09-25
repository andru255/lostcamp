$.c.Camera = function(xView, yView, canvasWidth, canvasHeight, floorWidth, floorHeight){
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
    //rectangle to represent viewport
    this.viewPortRect = new FixtureSquare(
        this.xView,
        this.yView,
        this.widthView,
        this.heightView
    );
    this.viewPortRect.fillStyle = "rgba(250, 250, 0, 0.5)";
    this.viewPortRect.strokeStyle = "rgba(250, 250, 0)";
    this.viewPortRect.lineWidth = 1;

    //rectangle to represent floor
    this.floorRect = new FixtureSquare(
        0,
        0,
        floorWidth,
        floorHeight
    );
    this.floorRect.fillStyle = "rgba(100, 100, 0, 0.5)";
};

$.c.Camera.prototype.init = function(){
};

//when the user need to navigate all the map
/*$.c.Camera.prototype.enableAgnosticMove = function(dealWithBoundRect){
    this.boundRect = new FixtureSquare(
        this.xView,
        this.yView,
        this.widthView,
        this.heightView
    );
    this.followed = this.boundRect;
    dealWithBoundRect.call(this.boundRect);
};*/

//when assign an element
$.c.Camera.prototype.follow = function(objToFollow, xMinDistance, yMinDistance){
    this.followed = objToFollow;
    this.xMinDistance = xMinDistance;
    this.yMinDistance = yMinDistance;
};

$.c.Camera.prototype.update = function(){
    if(this.followed != null){
        //left <-> right
        if(this.followed.x - this.xView + this.xMinDistance > this.widthView){
            this.xView = this.followed.x - (this.widthView - this.xMinDistance);
        } else if(this.followed.x - this.xMinDistance < this.xView){
            this.xView = this.followed.x - this.xMinDistance;
        }
        //top ^|v bottom
        if(this.followed.y - this.yView + this.yMinDistance > this.heightView){
            this.yView = this.followed.y - (this.heightView - this.yMinDistance);
        } else if(this.followed.y - this.yMinDistance < this.yView){
            this.yView = this.followed.y - this.yMinDistance;
        }
    }
    //update viewport position
    this.viewPortRect.updateFeatures(this.xView, this.yView);

    //don't let the camera the floor's boundary
    if(!this.viewPortRect.within(this.floorRect)){
        var bounds = {
            LEFT  : this.viewPortRect.x      < this.floorRect.x,
            RIGHT : this.viewPortRect.right  > this.floorRect.right,
            TOP   : this.viewPortRect.y      < this.floorRect.y,
            BOTTOM: this.viewPortRect.bottom > this.floorRect.bottom
        };

        if(bounds.LEFT){
            this.xView = this.floorRect.x;
        } else if(bounds.RIGHT){
            this.xView = this.floorRect.right - this.widthView;
        }

        if(bounds.TOP){
            this.yView = this.floorRect.y;
        } else if(bounds.BOTTOM){
            this.yView = this.floorRect.bottom - this.heightView;
        }
    }
};