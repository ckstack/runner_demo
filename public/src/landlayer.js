var landLayer = cc.Layer.extend({
    land_1: null,
    land_2: null,
    land_size: null,
    gamelayer: null,
    totalDist: 0,
    previousDist: 0,
    previousPos: null,
    nowPos: null,
    score: 0,
    init: function () {
        this._super();
        this.gamelayer = this.getParent();
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
        var landMove = new cc.moveBy(0.4, cc.p(-150, 0));
        this.runAction(landMove.repeatForever());
        this.scheduleUpdate();
    },

    update: function (dt) {
        this._super();
        this.nowPos = this.getPositionX();
        if (-this.nowPos > -this.previousPos) {
            this.totalDist += (-this.nowPos + this.previousPos);
        } else {
            this.totalDist += (-this.nowPos);
        }
        this.previousPos = this.nowPos;
        if (-this.nowPos > this.land_size.width) {
            this.setPosition(0, 0);
        }
        if ((this.totalDist - this.previousDist) > 100) {
            this.previousDist = this.totalDist;
            this.score = Math.floor((Math.floor(this.previousDist) / 100));
            this.gamelayer.updateScoreText("当前得分：" + this.score);
        }
        if (this.gamelayer.getIsGameOver()) {
            this.stopAllActions();
            this.unscheduleUpdate();
        }
    },

    onExit: function () {
        this._super();
        this.unscheduleUpdate();
    }
});