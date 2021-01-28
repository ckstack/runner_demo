var playLayer = cc.Layer.extend({
    gamelayer: null,
    winSize: null,
    playerSprite: null,
    treeSprite: null,
    playAction: null,
    runAnimate: null,
    rect1: null,
    rect2: null,
    isIntersect: null,
    upAction: null,
    downAction: null,
    upEaseOut: null,
    downEaseIn: null,
    treeMoveList: [],
    treeSpriteList: [],
    runningTreeList: [],
    index: 1,
    keyListener: null,
    init: function () {
        this._super();
        this.gamelayer = this.getParent();
        this.winSize = cc.director.getWinSize();
        if (this.treeSpriteList.length === 0) {
            for (let i = 0; i < 6; i++) {
                let sprite_frame = cc.spriteFrameCache.getSpriteFrame("game_tree_" + (i + 1) + ".png");
                let treeSprite = new cc.Sprite(sprite_frame);
                treeSprite.setAnchorPoint(0, 0);
                treeSprite.setTag(i);
                this.treeSpriteList.push(treeSprite);
            }
        }
        this.upAction = cc.moveBy(0.4, cc.p(0, 120));
        this.downAction = this.upAction.reverse();
        this.upEaseOut = new cc.EaseOut(this.upAction, 3);
        this.downEaseIn = new cc.EaseIn(this.downAction, 3);

        // 定义一个仙人掌动画数组
        for (let i = 0; i < 2; i++) {
            let tree_move = new cc.moveBy(0.4, cc.p(-150, 0));
            this.treeMoveList.push(tree_move);
        }

        // 添加一个仙人掌正在移动中的列表
        for (let i = 0; i < 2; i++) {
            let tree = this.treeSpriteList[i];
            let x = this.winSize.width + i * 400 + Math.floor((Math.random() * 200));
            tree.setPosition(x, 10);
            this.runningTreeList.push(tree);
        }

        for (let i = 0; i < 2; i++) {
            let tree = this.runningTreeList[i];
            this.addChild(tree, 1, tree.getTag());
            tree.runAction(this.treeMoveList[i].repeatForever());
        }

        // 添加一个玩家控制的恐龙精灵
        var playerSpriteF = cc.spriteFrameCache.getSpriteFrame("sprite_normal_1.png");
        this.playerSprite = new cc.Sprite(playerSpriteF);
        this.playerSprite.setAnchorPoint(0, 0);
        this.playerSprite.setPosition(50, 10);
        this.addChild(this.playerSprite, 3);

        // 添加一个恐龙动画
        var animation = new cc.Animation();
        var running_1 = cc.spriteFrameCache.getSpriteFrame("sprite_running_1.png");
        var running_2 = cc.spriteFrameCache.getSpriteFrame("sprite_running_2.png");
        animation.addSpriteFrame(running_1);
        animation.addSpriteFrame(running_2);
        animation.setDelayPerUnit(1 / 6);
        this.runAnimate = cc.animate(animation);
        this.playAction = this.playerSprite.runAction(this.runAnimate.repeatForever());

        this.scheduleUpdate();

        var that = this;
        this.keyListener = {
            event: cc.EventListener.KEYBOARD,
            isDoing: false,
            onKeyReleased: function (key, event) {
                if (!this.isDoing && key === cc.KEY.w) {
                    that.playerSprite.stopAction(that.playAction);
                    this.isDoing = true;
                    var jumpSeq = cc.sequence(that.upEaseOut, that.downEaseIn, cc.callFunc(function () {
                        that.playerSprite.runAction(that.runAnimate);
                        this.isDoing = false;
                    }, this));
                    that.playerSprite.runAction(jumpSeq);
                }
            }
        };
        if ('keyboard' in cc.sys.capabilities) {
            if (!this.gamelayer.getIsGameOver()) {
                cc.eventManager.addListener(this.keyListener, this);
            }
        }
    },

    update: function (dt) {
        this._super();
        let tree1Pos = this.runningTreeList[0].getPositionX();
        // let tree2Pos = this.runningTreeList[1].getPositionX();
        if (tree1Pos < (-68)) {
            this.index++;
            this.runningTreeList[0].stopAllActions();
            this.removeChild(this.runningTreeList[0]);
            this.runningTreeList.shift();
            let tree = this.treeSpriteList[this.index % 6];
            this.runningTreeList.push(tree);
            let x = this.winSize.width + Math.floor((Math.random() * 200));
            tree.setPosition(x, 10);
            tree.runAction(this.treeMoveList[this.index % 2].repeatForever());
            this.addChild(tree, 1, tree.getTag());
        }
        this.rect1 = this.runningTreeList[0].getBoundingBox();
        this.rect2 = this.playerSprite.getBoundingBox();
        this.isIntersect = cc.rectIntersectsRect(this.rect1, this.rect2);
        if (this.isIntersect) {
            this.playerSprite.stopAllActions();
            this.removeChild(this.playerSprite);
            this.runningTreeList[0].stopAllActions();
            this.runningTreeList[1].stopAllActions();
            this.runningTreeList.splice(0);
            this.gamelayer.setIsGameOver(true);
            cc.eventManager.removeListener(this.keyListener);
            cc.audioEngine.playEffect(g_resources[7], false);
            this.unscheduleUpdate();
        }
    },

    onExit: function () {
        this._super();
        this.gamelayer.setIsGameOver(false);
        this.unscheduleUpdate();
        this.removeAllChildren();
    }
});