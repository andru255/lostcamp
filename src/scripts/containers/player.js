function ContainerPlayer(){};
ContainerPlayer.prototype.init = function(ctx){
    this.ctx = ctx;
    this.x = MAIN_CANVAS_WIDTH / 2;
    this.y = MAIN_CANVAS_HEIGHT / 2;
    this.v = _vertex(this.x, this.y);
    this.shape = new FixturePolygon(
        this.x, 
        this.y,
        this.v
    );
    this.bindEvents();
};
var _vertex = function(x, y){
    return [
        {x: x - 25, y: y},
        {x: x - 25, y: y - 25},
        {x: x     , y: y - 25},
        {x: x + 25, y: y - 25},
        {x: x + 25, y: y},
        {x: x + 25, y: y + 25},
        {x: x     , y: y + 25}
    ]
}
ContainerPlayer.prototype.bindEvents = function(){
    var offsetLeft = MAIN_EL_CANVAS.offsetLeft;
    var offsetTop = MAIN_EL_CANVAS.offsetTop;

    MAIN_EL_CANVAS.addEventListener("click", (evt) => {
        this.shape.x = evt.pageX - offsetLeft;
        this.shape.y = evt.pageY - offsetTop;
        this.shape.vertices = _vertex(this.shape.x, this.shape.y);
    }, false);
}
ContainerPlayer.prototype.render = function(){
    this.shape.draw(this.ctx);
};