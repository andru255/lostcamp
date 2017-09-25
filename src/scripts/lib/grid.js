var GRID = function(width, height){
    this.width = width;
    this.height = height;
};
GRID.prototype.generate = function(){
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;
    this._createColumns(ctx, 100);
    this._createRows(ctx, 100);
    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");
};
GRID.prototype.render = function(contextTarget, source, distance){
    contextTarget.drawImage(this.image, 
                            source.x, 
                            source.y, 
                            source.w, 
                            source.h, 
                            distance.x,
                            distance.y,
                            distance.w,
                            distance.h);
};
GRID.prototype._newPath = function(ctx, onNewPath){
    ctx.save();
    ctx.beginPath();
    onNewPath.call(this);
    ctx.closePath();
    ctx.restore();
};
GRID.prototype._createPoint = function(options){
    var ctx = options.context;
    var textForDebug = ``;
    if(typeof options.debug === "boolean" && options.debug){
        textForDebug= `x: ${options.x}, y: ${options.y}`;
    }
    this._newPath(ctx, function(){
        ctx.strokeStyle = options.color || "black";
        ctx.strokeText(`.${options.text} ${textForDebug?"|${textForDebug}": ""}`, options.x, options.y);
    });
};
GRID.prototype._createVerticalLine = function(ctx, x, y, size){
    this._createPoint({
        context: ctx,
        x: x,
        y: y + 10,
        color: "#0000ff",
        text: x
    });
    this._newPath(ctx, function(){
        ctx.strokeStyle = "#0000ff";
        ctx.moveTo(x, y);
        ctx.lineTo(x, size);
        ctx.stroke();
    });
};
GRID.prototype._createHorizontalLine = function(ctx, x, y, size){
    this._createPoint({
        context: ctx,
        x: x,
        y: y,
        color: "#ff0000",
        text: y
    });
    this._newPath(ctx, function(){
        ctx.strokeStyle = "#ff0000";
        ctx.moveTo(x, y);
        ctx.lineTo(size, y);
        ctx.stroke();
    });
};
GRID.prototype._createColumns = function(ctx, columnWidth) {
    var numColumns =  Math.ceil(this.width/columnWidth);
    var coordX = 0;
    for(var index=0; index<numColumns; index++){
        this._createVerticalLine(ctx, coordX, 0, this.height);
        coordX += columnWidth;
    }
};
GRID.prototype._createRows = function(ctx, rowHeight) {
    var numRows =  Math.ceil(this.height/rowHeight);
    var coordY = 0;
    for(var index=0; index<numRows; index++){
        this._createHorizontalLine(ctx, 0, coordY, this.width);
        coordY += rowHeight;
    }
};