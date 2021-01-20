var homeScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var imgSprite = new cc.Sprite(g_resources[0]);
        imgSprite.setPosition(100, 100);
        this.addChild(imgSprite, 1);
    }
});