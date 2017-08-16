var player = new ContainerPlayer();
/* start init fns*/
var GAME_INIT = function(){
    // core - elements
    window.MAIN_EL_CANVAS = new DOM("main", false, "canvas").selfie;
    window.MAIN_CANVAS = new CANVAS(MAIN_EL_CANVAS);
    window.MAIN_CONTEXT = MAIN_CANVAS.getCtx();

    //core - dimentions
    window.MAIN_CANVAS_WIDTH    = MAIN_EL_CANVAS.width;
    window.MAIN_CANVAS_HEIGHT   = MAIN_EL_CANVAS.height;

    // BOUNDS
    window.MAIN_CANVAS_BOUNDS = {
        TOP: 0,
        LEFT: 0,
        RIGHT: MAIN_CANVAS_WIDTH,
        BOTTOM: MAIN_CANVAS_HEIGHT
    };
    player.init(MAIN_CONTEXT);
};