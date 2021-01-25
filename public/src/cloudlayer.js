var cloudLayer = cc.Layer.extend({
    cloudSprite: null,
    layerSize: null,
    init: function () {
        this._super();
        this.layerSize = this.getContentSize();
        // 添加一个云图片精灵
        var cloudSpriteF = cc.spriteFrameCache.getSpriteFrame("game_cloud.png");
        this.cloudSprite = new cc.Sprite(cloudSpriteF);
        this.cloudSprite.setAnchorPoint(0, 0);
        this.cloudSprite.setPosition(this.layerSize.width, (this.layerSize.height - 100));
        this.addChild(this.cloudSprite, 0);
        // 添加一个云图层移动动画
        var landMove = new cc.moveBy(1, cc.p(-20, 0));
        this.runAction(landMove.repeatForever());
        this.scheduleUpdate();
    },

    update: function (dt) {
        this._super();
        var pos = this.getPositionX();
        if (-pos > (this.layerSize.width + 100)) {
            this.setPosition(0, 0);
        }
    },

    onExit: function () {
        this._super();
        this.unscheduleUpdate();
    }
});