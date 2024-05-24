// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import HistoryGroup from "./HistoryGroup";
import GameManager from "./Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class History extends cc.Component {

    @property(cc.Label)
    totalProfitLabel: cc.Label = null;

    // SetTotalProfit(amount : number){
    //     if(amount >= GameManager.Instance.currentBetLevel){
    //         this.totalProfitLabel.string = "+" + amount.toFixed() + " VND";
    //         this.node.color = HistoryGroup.Instance.winColor;
    //     }
    //     else{
    //         this.totalProfitLabel.string = "+" + amount.toFixed() + " VND";
    //         this.node.color = HistoryGroup.Instance.loseColor;
    //     }
    // }

    // public Anim(): void {

    //     var heighTemp = this.node.height;
    //     var widthTemp = this.node.width;
    //     this.node.height = this.node.width = 0;

    //     let node = cc.tween(this.node)
    //     .to(0.5, {height: heighTemp, width: widthTemp, })
    //     .start();


    // }
}
