function ContainerPlayer(){};
ContainerPlayer.prototype.init = function(ctx){
    this.ctx = ctx;
    this.x = MAIN_CANVAS_WIDTH / 2;
    this.y = MAIN_CANVAS_HEIGHT / 2;
    this.shape = new FixtureSquare(
        this.x, 
        this.y,
        50,
        50
    );
    this.tX = false;
    this.tY = false;
    this.bindEvents();
};
ContainerPlayer.prototype.bindEvents = function(){
    var offsetLeft = MAIN_EL_CANVAS.offsetLeft;
    var offsetTop = MAIN_EL_CANVAS.offsetTop;
    var that = this;

    MAIN_EL_CANVAS.addEventListener("click", (evt) => {
        //this.shape.x = evt.pageX - offsetLeft;
        //this.shape.y = evt.pageY - offsetTop;
        this.tX = evt.pageX - offsetLeft; 
        this.tY = evt.pageY - offsetTop;
    }, false);
};

ContainerPlayer.prototype.translate = function(aX, aY, tX, tY){
    if(tX && tY){
        var dX = tX - aX;
        var dY = tY - aY;
        var vX = dX * 0.03;
        var vY = dY * 0.03;
        this.shape.x += vX;
        this.shape.y += vY;
    }
};
ContainerPlayer.prototype.render = function(){
    this.translate(this.shape.x, this.shape.y, this.tX, this.tY);
    this.shape.draw(this.ctx);
};