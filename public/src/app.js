var homeLayer = cc.Layer.extend({
    imgSprite: null,
    topScore: null,
    gameName: null,
    startGame: null,
    init: function () {
        this._super();
        // Sprite类的Anchor Point默认是(0.5, 0.5)
        // 添加一张显示恐龙图片的精灵
        this.imgSprite = new cc.Sprite(g_resources[0]);
        var winSize = cc.director.getWinSize();
        this.imgSprite.setPosition(winSize.width / 2, 50);
        this.addChild(this.imgSprite, 1);

        // 添加一个显示最高分的标签
        this.topScore = new cc.LabelTTF("最高分：0", "Impact", 18);
        this.topScore.setAnchorPoint(0, 0);
        this.topScore.setPosition(20, (winSize.height - 50));
        this.topScore.setFontFillColor(cc.color("#555555"));
        this.addChild(this.topScore, 1);

        // 添加一个显示游戏名称的标签
        this.gameName = new cc.LabelTTF("恐 龙 酷 跑", "Impact", 36);
        this.gameName.setPosition(winSize.width / 2, (winSize.height / 2 + 50));
        this.gameName.setFontFillColor(cc.color("#555555"));
        this.addChild(this.gameName, 1);

        // 添加一个开始游戏的按钮
        this.startGame = new ccui.Button(g_resources[1], g_resources[2]);
        this.startGame.setPosition(winSize.width / 2, (winSize.height / 2 - 10));
        this.startGame.setTitleText("开始游戏");
        this.startGame.addClickEventListener(function () {
            var game_scene = new gameScene();
            cc.director.pushScene(game_scene);
        });
        this.addChild(this.startGame, 1);
        return true;
    }
});

var homeScene = cc.Scene.extend({
    layer: null,
    onEnter: function () {
        this._super();
        if (!this.layer) {
            this.layer = new homeLayer();
            this.addChild(this.layer, 0);
            this.layer.init();
        }
    }
});