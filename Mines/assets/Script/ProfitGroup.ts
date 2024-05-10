// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ProfitGroup extends cc.Component {
    
    @property(cc.Label)
    totalProfitLabel: cc.Label = null;

    @property(cc.Label)
    profitOnNextTileLabel: cc.Label = null;


    Init(){
        this.UpdateProfit(GameManager.Instance.currentBetLevel, GameManager.Instance.profitOnNextTile);
        this.SetProfitState(false);
    }


    SetTotalProfit(amount : number){
        this.totalProfitLabel.string = "Total profit: " + amount.toFixed() + " VND";
    }

    SetProfitOnNextTile(amount : number, cost : number){
        this.profitOnNextTileLabel.string = "Profit on next tile: " + amount.toFixed() + " VND" + " (x" + cost + ")";
    }

    SetTotalProfitState(state : boolean){
        this.totalProfitLabel.node.active = state;
    }
    SetProfitOnNextTileState(state : boolean){
        this.profitOnNextTileLabel.node.active = state;
    }

    SetProfitState(state : boolean){
        this.SetTotalProfitState(state);
        this.SetProfitOnNextTileState(state);
    }
    UpdateProfit(totalProfit : number, profitOnNextTile : number){
        this.SetTotalProfit(totalProfit);
        this.SetProfitOnNextTile(profitOnNextTile, GameManager.Instance.CostNextTile());

        GameManager.Instance.totalProfit = Math.round(totalProfit);
        GameManager.Instance.profitOnNextTile = Math.round(profitOnNextTile);
    }
}
