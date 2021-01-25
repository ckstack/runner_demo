var gameLayer = cc.Layer.extend({
    topScore: null,
    winSize: null,
    init: function () {
        this._super();
        this.winSize = cc.director.getWinSize();

        // 添加一个显示当前得分的标签
        this.topScore = new cc.LabelTTF("当前得分：0", "Impact", 18);
        this.topScore.setAnchorPoint(0, 0);
        this.topScore.setPosition(20, (this.winSize.height - 50));
        this.topScore.setFontFillColor(cc.color("#555555"));
        this.addChild(this.topScore, 0);
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
            onMouseUp: function(event){
                cc.director.popScene();
            }
        }, this);
    }
});