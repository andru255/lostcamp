setTimeout(()=> {
    GAME_INIT();
    MAIN_CANVAS.fpf((step)=>{
        MAIN_CANVAS.clean();
        GAME_RENDER();
    })
}, 0);