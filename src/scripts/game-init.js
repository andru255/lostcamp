var player = new ContainerPlayer();
var miniMap = new ContainerMinimap();
/* start init fns*/
var GAME_INIT = function(){
    // core - elements
    window.MAIN_EL_CANVAS = new DOM("main", false, "canvas").selfie;
    window.MAIN_CANVAS = new CANVAS(MAIN_EL_CANVAS);
    window.MAIN_CONTEXT = MAIN_CANVAS.getCtx();

    window.MINIMAP_EL_CANVAS = new DOM("minimap", false, "canvas").selfie;
    window.MINIMAP_CANVAS = new CANVAS(MINIMAP_EL_CANVAS);
    window.MINIMAP_CONTEXT = MINIMAP_CANVAS.getCtx();

    //core - dimentions
    window.MAIN_CANVAS_WIDTH    = MAIN_EL_CANVAS.width;
    window.MAIN_CANVAS_HEIGHT   = MAIN_EL_CANVAS.height;
    window.MINIMAP_CANVAS_WIDTH    = MINIMAP_EL_CANVAS.width;
    window.MINIMAP_CANVAS_HEIGHT   = MINIMAP_EL_CANVAS.height;

    // BOUNDS
    window.MAIN_CANVAS_BOUNDS = {
        TOP: 0,
        LEFT: 0,
        RIGHT: MAIN_CANVAS_WIDTH,
        BOTTOM: MAIN_CANVAS_HEIGHT
    };
    player.init(MAIN_CONTEXT);
    miniMap.init(MINIMAP_CONTEXT);
};