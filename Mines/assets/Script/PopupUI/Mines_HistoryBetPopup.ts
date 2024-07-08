// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_HistoryBet from "./Mines_HistoryBet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_HistoryBetPopup extends cc.Component {
    @property(cc.SpriteFrame)
    private lineDark : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private lineLight : cc.SpriteFrame = null;

    @property(cc.Node)
    private historyBetList : cc.Node = null;

    @property(cc.Button)
    private closeButton : cc.Button = null;

    @property(cc.Prefab)
    private historyBetPrefab : cc.Prefab = null;

    @property(cc.Node)
    private panel : cc.Node = null;



    public GetCloseButton(){
        return this.closeButton;
    }

    public GetPanel(){
        return this.panel;
    }


    public SpawnHistoryBet(session : number, betLevel : number){
        this.CheckHistoryBetList();


        let historyBet = cc.instantiate(this.historyBetPrefab);
        historyBet.setParent(this.historyBetList);
        let historyBetComponent = historyBet.getComponent(Mines_HistoryBet);
        
        historyBetComponent.SetSessionLabel(session);
        historyBetComponent.SetTimeLabel();
        historyBetComponent.SetBetLevelLabel(betLevel);
        historyBetComponent.SetMoneyWinLabel(session * betLevel);
        
        historyBet.setSiblingIndex(0);
    }

    private CheckHistoryBetList(){
        if(this.historyBetList.childrenCount >= 7){
            this.historyBetList.children[this.historyBetList.childrenCount -1].destroy();
        }
    }
}
