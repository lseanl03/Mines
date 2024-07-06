// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_TopBet from "./Mines_TopBet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_TopBetPopup extends cc.Component {
    @property(cc.SpriteFrame)
    private lineDark : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private lineLight : cc.SpriteFrame = null;

    @property(cc.Node)
    private topBetList : cc.Node = null;

    @property(cc.Button)
    private closeButton : cc.Button = null;

    @property(cc.Prefab)
    private topBetPrefab : cc.Prefab = null;

    @property(cc.Node)
    private panel : cc.Node = null;



    public GetCloseButton(){
        return this.closeButton;
    }

    public GetPanel(){
        return this.panel;
    }

    public SpawnTopBet(moneyWin : number){

        this.CheckTopBetList();

        let topBet = cc.instantiate(this.topBetPrefab);
        topBet.setParent(this.topBetList);

        let topBetComponent = topBet.getComponent(Mines_TopBet);

        topBetComponent.SetUserNameLabel();
        topBetComponent.SetMoneyWinLabel(moneyWin);

        this.UpdateTopBet(topBetComponent);

    }

    UpdateTopBet(currentTopBet : Mines_TopBet){

        let index = currentTopBet.node.getSiblingIndex();

        for(let i=0; i<this.topBetList.childrenCount; i++){
            let topBet = this.topBetList.children[i];
            let topBetComponent = topBet.getComponent(Mines_TopBet);

            if(currentTopBet.GetMoneyWin() > topBetComponent.GetMoneyWin()){
                index = i;
                cc.log("index: " + index);
                break;
            }
        }

        currentTopBet.node.setSiblingIndex(index);

        for(let i=0; i<this.topBetList.childrenCount; i++){
            let topBet = this.topBetList.children[i];
            let topBetComponent = topBet.getComponent(Mines_TopBet);

            topBetComponent.SetRankLabel(i+1);

            topBet.getSiblingIndex() % 2 == 0 ? 
            topBetComponent.GetSprite().spriteFrame = this.lineLight : 
            topBetComponent.GetSprite().spriteFrame = this.lineDark;
        }
    }

    private CheckTopBetList(){
        if(this.topBetList.childrenCount >= 7){
            this.topBetList.children[this.topBetList.childrenCount -1].destroy();
        }
    }
}