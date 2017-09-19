setTimeout(()=> {
    $.init();
    $.global.MainC().fpf((step)=>{
        $.global.MainC().clean();
        $.render();
    })
}, 0);