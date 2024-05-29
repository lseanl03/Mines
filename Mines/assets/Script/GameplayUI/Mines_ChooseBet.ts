// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";
import Mines_GameManager from "../Manager/Mines_GameManager";
import Mines_BetGroup from "./Mines_BetGroup";

const {ccclass, property} = cc._decorator;

export enum BetLevelType{
    None = 0,
    _5000 = 5000,
    _10000 = 10000,
    _50000 = 50000,
    _100000 = 100000,
    _500000 = 500000,
    _5000000 = 5000000,
}

@ccclass
export default class Mines_ChooseBet extends ButtonBase {

    @property({type:cc.Enum(BetLevelType)})
    private betLevelType: BetLevelType = BetLevelType.None;

    protected onLoad(): void {
        super.onLoad();
        this.node.on('click', this.OnClick, this);
    }

    private OnClick(){
        if(Mines_GameManager.Instance.IsBetting()) return; 
        Mines_BetGroup.Instance.SetBetLevel(this.betLevelType);
    }
    override EffectActive(value: any): void {

        if(Mines_GameManager.Instance.IsBetting()) return; 
        super.EffectActive(value);    
    }
}
