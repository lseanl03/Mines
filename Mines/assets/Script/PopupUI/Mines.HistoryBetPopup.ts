// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesConfig from "../Mines.Config";
import PopupBase from "../PopupBase";
import MinesHistoryBet from "./Mines.HistoryBet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesHistoryBetPopup extends PopupBase {
  
    @property(cc.SpriteFrame)
    private lineDark : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private lineLight : cc.SpriteFrame = null;

    @property(cc.Node)
    private historyBetList : cc.Node = null;

    @property(cc.Prefab)
    private historyBetPrefab : cc.Prefab = null;



    public SpawnHistoryBet(session : number, betLevel : number){
        this.CheckHistoryBetList();


        let historyBet = cc.instantiate(this.historyBetPrefab);
        historyBet.setParent(this.historyBetList);
        let historyBetComponent = historyBet.getComponent(MinesHistoryBet);
        
        historyBetComponent.SetSessionLabel(session);
        historyBetComponent.SetTimeLabel();
        historyBetComponent.SetBetLevelLabel(betLevel);
        historyBetComponent.SetMoneyWinLabel(session * betLevel);
        
        historyBet.setSiblingIndex(0);
    }

    private CheckHistoryBetList(){
        if(this.historyBetList.childrenCount >= MinesConfig.maxRow){
            this.historyBetList.children[this.historyBetList.childrenCount -1].destroy();
        }
    }
}
