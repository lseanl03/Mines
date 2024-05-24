// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";
import GameManager from "../Manager/GameManager";
import BetGroup from "./BetGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetButton extends ButtonBase {

    @property(cc.SpriteFrame)
    betSpriteFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    stopSpriteFrame: cc.SpriteFrame = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    SetButtonSprite(isBetting: boolean){
        if(isBetting) {
            this.sprite.spriteFrame = this.stopSpriteFrame;
            BetGroup.Instance.SetItemSprite(true);
        }
        else{
            this.sprite.spriteFrame = this.betSpriteFrame;
            BetGroup.Instance.SetItemSprite(false);
        }
    }
}
