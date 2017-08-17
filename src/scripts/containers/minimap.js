function ContainerMinimap(){};
ContainerMinimap.prototype.init = function(ctx){
    this.ctx = ctx;
    this.x = MINIMAP_CANVAS_WIDTH / 2;
    this.y = MINIMAP_CANVAS_HEIGHT / 2;
    this.shape = new FixtureSquare(
        this.x, 
        this.y,
        20,
        20
    );
    this.shape.style = "transparent";
    this.shape.lineWidth = 2;
    this.shape.stroke = "blue";
};
ContainerMinimap.prototype.render = function(){
    this.shape.draw(this.ctx);
};