// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesConfig from "../Mines.Config";
import PopupBase from "../PopupBase";
import MinesTopBet from "./Mines.TopBet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesTopBetPopup extends PopupBase {
    @property(cc.SpriteFrame)
    private lineDark : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private lineLight : cc.SpriteFrame = null;

    @property(cc.Node)
    private topBetList : cc.Node = null;


    @property(cc.Prefab)
    private topBetPrefab : cc.Prefab = null;

    public SpawnTopBet(moneyWin : number){

        this.CheckTopBetList();

        let topBet = cc.instantiate(this.topBetPrefab);
        topBet.setParent(this.topBetList);

        let topBetComponent = topBet.getComponent(MinesTopBet);

        topBetComponent.SetUserNameLabel();
        topBetComponent.SetMoneyWinLabel(moneyWin);

        this.UpdateTopBet(topBetComponent);

    }

    private UpdateTopBet(currentTopBet : MinesTopBet){

        let index = currentTopBet.node.getSiblingIndex();

        for(let i=0; i<this.topBetList.childrenCount; i++){
            let topBet = this.topBetList.children[i];
            let topBetComponent = topBet.getComponent(MinesTopBet);

            if(currentTopBet.GetMoneyWin() > topBetComponent.GetMoneyWin()){
                index = i;
                cc.log("index: " + index);
                break;
            }
        }

        currentTopBet.node.setSiblingIndex(index);

        for(let i=0; i<this.topBetList.childrenCount; i++){
            let topBet = this.topBetList.children[i];
            let topBetComponent = topBet.getComponent(MinesTopBet);

            topBetComponent.SetRankLabel(i+1);

        }
    }

    private CheckTopBetList(){
        if(this.topBetList.childrenCount >= MinesConfig.maxRow){
            this.topBetList.children[this.topBetList.childrenCount -1].destroy();
        }
    }
}
