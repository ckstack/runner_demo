var gameLayer = cc.Layer.extend({
    scoreText: null,
    winSize: null,
    land_layer: null,
    cloud_layer: null,
    play_layer: null,
    isGameOver: false,
    init: function () {
        this._super();
        this.winSize = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(g_resources[3]);
        // 添加一个显示当前得分的标签
        this.scoreText = new cc.LabelTTF("当前得分：0", "Impact", 18);
        this.scoreText.setAnchorPoint(0, 0);
        this.scoreText.setPosition(20, (this.winSize.height - 50));
        this.scoreText.setFontFillColor(cc.color("#555555"));
        this.addChild(this.scoreText, 0);
        // 添加一个地面图层
        this.land_layer = new landLayer();
        this.addChild(this.land_layer, 0);
        this.land_layer.init();
        // 添加一个云背景图层
        this.cloud_layer = new cloudLayer();
        this.addChild(this.cloud_layer, 0);
        this.cloud_layer.init();
        // 添加一个控制图层
        this.play_layer = new playLayer();
        this.addChild(this.play_layer, 1);
        this.play_layer.init();
    },

    updateScoreText: function (scoreString) {
        this.scoreText.setString(scoreString);
    },

    getIsGameOver: function () {
        return this.isGameOver;
    },

    setIsGameOver: function (gameOver) {
        this.isGameOver = gameOver;
    },

    getScoreText: function () {
        return this.scoreText.getString();
    }
});

var gameScene = cc.Scene.extend({
    game_layer: null,
    onEnter: function () {
        this._super();
        if (!this.game_layer) {
            this.game_layer = new gameLayer();
            this.addChild(this.game_layer, 0);
            this.game_layer.init();
        }
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseUp: function (event) {
                cc.director.popScene();
            }
        }, this);
    },

    onExit: function () {
        this._super();
        var currentScore = this.game_layer.getScoreText().substr(5);
        cc.sys.localStorage.setItem("currentScore", currentScore);
    }
});