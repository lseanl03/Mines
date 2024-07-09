// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";
import MinesBetGroup from "./Mines.BetGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesBetButton extends ButtonBase {

    @property(cc.SpriteFrame)
    private betSpriteFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private stopSpriteFrame: cc.SpriteFrame = null;

    private sprite: cc.Sprite = null;

    onLoad(){
        super.onLoad();
        this.sprite = this.node.getComponent(cc.Sprite);
    }

    public SetButtonSprite(isBetting: boolean){
        if(isBetting) {
            this.sprite.spriteFrame = this.stopSpriteFrame;
            MinesBetGroup.Instance.SetItemSprite(true);
        }
        else{
            this.sprite.spriteFrame = this.betSpriteFrame;
            MinesBetGroup.Instance.SetItemSprite(false);
        }
    }
}
