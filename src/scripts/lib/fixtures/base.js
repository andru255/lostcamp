function Fixture(){
    this.velocityX = 0;
    this.velocityY = 0;
    this.velocityZ = 0;
    this.friction  = 0;
    this.debug     = true;
}
Fixture.prototype.fillAndStroke = function(ctx){
    ctx.fillStyle = this.style || false;
    ctx.fill();
    if(this.lineWidth > 0){
        ctx.strokeStyle = this.stroke || false;
        ctx.lineWidth = this.lineWidth || 0;
    }
    ctx.stroke();
    this.debug && this.showDebugMode(ctx);
};
Fixture.prototype.showDebugMode = function(ctx){
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = "#00ff00";
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false)
    ctx.fill();
    ctx.restore();
}