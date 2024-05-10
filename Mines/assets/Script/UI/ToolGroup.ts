// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import BetButton from "./BetButton";
import CenterGroup from "./CenterGroup";
import PickRandomButton from "./PickRandomButton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ToolGroup extends cc.Component {

    @property(cc.Slider)
    mineSlider : cc.Slider = null;

    @property(cc.Label)
    currentMineLabel : cc.Label = null;
    
    @property(cc.Label)
    maxMineLabel : cc.Label = null;
    
    
    @property (cc.Label)
    currentBetLevelLabel : cc.Label = null;

    @property (cc.Label)
    currentMoneyLabel : cc.Label = null; 

    @property(cc.Button)
    divButton : cc.Button = null;

    @property(cc.Button)
    mulButton : cc.Button = null;

    @property(cc.Button)
    minButton : cc.Button = null;

    @property(cc.Button)
    maxButton : cc.Button = null;

    @property(PickRandomButton)
    pickRandomButton : PickRandomButton = null;

    @property(BetButton)
    betButton : BetButton = null;

    Init(){
        this.mineSlider.progress = 0;
        this.SetCurrentMine(1);
        this.SetMaxMine(CenterGroup.instance.GetAmountItem() - 1);
    }

    
    UpdateMine(){
        var index = Math.round(this.mineSlider.progress * (CenterGroup.instance.GetAmountItem() - 1));
        if(index < 1) index = 1; 
        this.SetCurrentMine(index);
    }


    SetCurrentMine(currentMine : number){
        this.currentMineLabel.string = currentMine.toFixed(0);
        
        CenterGroup.instance.SetPrimogem(24 - currentMine);
        CenterGroup.instance.SetMine(currentMine);

        GameManager.Instance.SetCurrentMineAmount(currentMine);
    }
    SetMaxMine(maxMine : number){
        this.maxMineLabel.string = maxMine.toFixed(0);
    }
    BetButtonLabel(value : string){
        this.betButton.label.string = value;
    }
}
