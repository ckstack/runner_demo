cc.game.onStart = function () {
    cc.director.setClearColor(cc.color(253,253,253,255));
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new homeScene());
    }, this);
};
cc.game.run();