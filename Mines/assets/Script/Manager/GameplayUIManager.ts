// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameplayUIManager extends cc.Component {

    public static Instance : GameplayUIManager = null;

    @property(cc.Node)
    itemGroupNode : cc.Node = null;

    @property(cc.Label)
    currentMoneyLabel : cc.Label = null;


    onLoad(){
        GameplayUIManager.Instance = this;
    }

    SetCurrentMoneyLabel(currentMoney : number){
        this.currentMoneyLabel.string = "Money: " + currentMoney + " VND";
    }

}
