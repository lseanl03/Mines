// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";
import GameManager from "../Manager/GameManager";
import GameplayUIManager from "../Manager/GameplayUIManager";
import BetGroup from "./BetGroup";

const {ccclass, property} = cc._decorator;


@ccclass
export default class ChooseMine extends ButtonBase {
    
    @property
    mineAmount: number = 0;

    @property(cc.Label)
    mineAmountLabel: cc.Label = null;

    @property(cc.Sprite)
    mineBorderSprite: cc.Sprite = null;

    protected onLoad(): void {
        super.onLoad();
        this.node.on('click', this.OnClick, this);
    }

    override EffectActive(value: any): void {

        if(GameManager.Instance.isBetting) return; 
        super.EffectActive(value);    
    }

    OnClick(){
        GameManager.Instance.SetCurrentMineAmount(this.mineAmount);
        BetGroup.Instance.SetChooseMineViewLabel(GameManager.Instance.currentMineAmount);
    }

    protected start(): void {
        this.Init();
    }
    Init(){
        this.SetMineAmountLabel();
    }

    SetMineAmountLabel(){
        this.mineAmountLabel.string = this.mineAmount.toString();
    }
    SetMineBorderSpriteState(isActive : boolean){
        this.mineBorderSprite.node.active = isActive;
    }
}
