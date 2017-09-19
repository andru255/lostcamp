/* start init fns*/
$.init = function(){
    // core - elements
    $.global = {
        //elements
        MainEC: new DOM("main", false, "canvas").selfie,
        MainC: () => new CANVAS($.global.MainEC),
        MainCtx: () => $.global.MainC().getCtx(),
        MiniEC: new DOM("minimap", false, "canvas").selfie,
        MiniC: () => new CANVAS($.global.MiniEC),
        MiniCtx: () => $.global.MiniC().getCtx(),
        //dimentions
        MainWidth: () => $.global.MainEC.width,
        MainHeight: () => $.global.MainEC.height,
        MiniWidth: () => Math.floor($.global.MainWidth() * 0.1),
        MiniHeight: () => Math.floor($.global.MainHeight() * 0.1),
        MainCBounds: {
            t: ()=> 0, 
            l: ()=> 0, 
            r: ()=> $.global.MainWidth(), 
            b: ()=> $.global.MainHeight()
        }
    };
    $.fs = [];
    $.i = {};

    (function(main, mini){
        $.i.main = new $.c.MainMap();
        $.i.main.init(main);
        //factories
        var numfactories = 10;
        var j = 100;
        for(var i = 0; i < numfactories; i++){
            $.i.f = new $.c.Factory(); 
            $.i.f.init(j, j, main);
            $.fs.push($.i.f);
            j += 100;
        }
        $.i.p = new $.c.Player();
        $.i.p.init(main);
        //$.i.mini = new $.c.MiniMap();
        //$.i.mini.init(mini);
    })($.global.MainCtx(), $.global.MiniCtx())
};