// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";
import MinesGameManager from "../Manager/Mines.GameManager";
import MinesBetGroup from "./Mines.BetGroup";

const {ccclass, property} = cc._decorator;


@ccclass
export default class MinesChooseMine extends ButtonBase {
    
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

        if(MinesGameManager.Instance.IsBetting()) return; 
        super.EffectActive(value);    
    }

    OnClick(){
        MinesGameManager.Instance.SetCurrentMineAmount(this.mineAmount);
        MinesBetGroup.Instance.GetChooseMineGroup().SetChooseMineViewLabel(MinesGameManager.Instance.CurrentMineAmount());
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