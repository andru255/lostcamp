/* start render fns*/
$.render = function(){
    $.i.camera.floorRect.draw($.global.MainCtx());
    $.i.camera.viewPortRect.draw($.global.MainCtx());
    //update
    $.i.p.update($.global.floorWidth(), $.global.floorHeight());
    $.i.camera.update();
    //render
    $.i.main.render($.i.camera.xView, $.i.camera.yView);
    $.i.p.render($.i.camera.xView, $.i.camera.yView);


    //$.i.mini.render();
    $.global.Log().innerText = `
        player-> x:${$.i.p.shape.x}, y: ${$.i.p.shape.y} \n
        camera-> xView: ${$.i.camera.xView}, yView: ${$.i.camera.yView}, xMinDistance: ${$.i.camera.xMinDistance} 
                 yMinDistance: ${$.i.camera.yMinDistance} \n
        followed-> x: ${$.i.camera.followed.x} y: ${$.i.camera.followed.y}\n
        viewportRect-> ${JSON.stringify($.i.camera.viewPortRect)} \n
        floorRect-> ${JSON.stringify($.i.camera.floorRect)}
    `
};
/* end render fns*/