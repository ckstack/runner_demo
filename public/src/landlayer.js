var landLayer = cc.Layer.extend({
    land_1: null,
    land_2: null,
    land_size: null,
    init: function () {
        this._super();
        // 添加两个地面图片精灵
        this.land_1 = new cc.Sprite(g_resources[5]);
        this.land_1.setAnchorPoint(0, 0);
        this.land_1.setPosition(0, 2);
        this.addChild(this.land_1, 0);
        this.land_size = this.land_1.getContentSize();
        this.land_2 = new cc.Sprite(g_resources[5]);
        this.land_2.setAnchorPoint(0, 0);
        this.land_2.setPosition(this.land_size.width, 2);
        this.addChild(this.land_2, 0);
        // 添加地面图层移动动画
        var landMove = new cc.moveBy(1, cc.p(-200, 0));
        this.runAction(landMove.repeatForever());
        this.scheduleUpdate();
    },

    update: function (dt) {
        this._super();
        var pos = this.getPositionX();
        if (-pos > this.land_size.width) {
            this.setPosition(0, 0);
        }
    },

    onExit: function () {
        this._super();
        this.unscheduleUpdate();
    }
});