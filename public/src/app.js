var homeLayer = cc.Layer.extend({
    imgSprite: null,
    scoreText: null,
    gameName: null,
    startGame: null,
    playMusic: null,
    init: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        // Sprite类的Anchor Point默认是(0.5, 0.5)
        // 添加一张显示恐龙图片的精灵
        this.imgSprite = new cc.Sprite(g_resources[0]);
        this.imgSprite.setPosition(winSize.width / 2, 50);
        this.addChild(this.imgSprite, 1);

        // 添加一个显示最高分的标签
        this.scoreText = new cc.LabelTTF("最高分：0", "Impact", 18);
        this.scoreText.setAnchorPoint(0, 0);
        this.scoreText.setPosition(20, (winSize.height - 50));
        this.scoreText.setFontFillColor(cc.color("#555555"));
        this.addChild(this.scoreText, 1);

        // 添加一个显示游戏名称的标签
        this.gameName = new cc.LabelTTF("恐 龙 酷 跑", "Impact", 36);
        this.gameName.setPosition(winSize.width / 2, (winSize.height / 2 + 50));
        this.gameName.setFontFillColor(cc.color("#555555"));
        this.addChild(this.gameName, 1);

        // 添加一个控制播放音乐的按钮
        this.playMusic = new ccui.Button(g_resources[9]);
        this.playMusic.setPosition(winSize.width - 80, winSize.height - 50);
        this.addChild(this.playMusic, 1);
        var that = this;
        this.playMusic.addClickEventListener(function () {
            if (!cc.audioEngine.isMusicPlaying()) {
                cc.audioEngine.playMusic(g_resources[6], false);
                that.playMusic.loadTextureNormal(g_resources[8]);
            } else {
                cc.audioEngine.stopMusic(false);
                that.playMusic.loadTextureNormal(g_resources[9]);
            }
        });

        // 添加一个开始游戏的按钮
        this.startGame = new ccui.Button(g_resources[1], g_resources[2]);
        this.startGame.setPosition(winSize.width / 2, (winSize.height / 2 - 10));
        this.startGame.setTitleText("开始游戏");
        this.startGame.addClickEventListener(function () {
            var game_scene = new gameScene();
            cc.director.pushScene(game_scene);
        });
        this.addChild(this.startGame, 1);
    },

    onEnter: function () {
        this._super();
        var highScore = Number.parseInt(cc.sys.localStorage.getItem("highestScore"));
        var currentScore = Number.parseInt(cc.sys.localStorage.getItem("currentScore"));
        if (currentScore > highScore) {
            this.scoreText.setString("最高分：" + currentScore);
            cc.sys.localStorage.setItem("highestScore", "" + currentScore);
        }
    },

    pause: function () {
        this._super();
        if (cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.stopMusic(false);
            this.playMusic.loadTextureNormal(g_resources[9]);
        }
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
            cc.sys.localStorage.setItem("highestScore", "0");
            cc.sys.localStorage.setItem("currentScore", "0");
        }
    }
});