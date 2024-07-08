// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_DataManager from "../Manager/Mines_DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_TopBet extends cc.Component {

    @property(cc.Label)
    private rankLabel : cc.Label = null;

    @property(cc.Label)
    private userNameLabel : cc.Label = null;

    @property(cc.Label)
    private moneyWinLabel : cc.Label = null;

    private moneyWin : number = 0;

    public GetMoneyWin(){
        return this.moneyWin;
    }
    public SetRankLabel(rank : number){
        this.rankLabel.string = "" + rank;
    }

    public SetUserNameLabel(){
        this.userNameLabel.string = Mines_DataManager.instance.GetNickName();
    }

    public SetMoneyWinLabel(moneyWin : number){
        if (moneyWin >= 1000000) {
            this.moneyWinLabel.string = (moneyWin/1000000) + "M";
        } else if (moneyWin >= 1000) {
            this.moneyWinLabel.string = (moneyWin/1000) + "K";
        } else {
            this.moneyWinLabel.string = "" + moneyWin;
        }
        this.moneyWin = moneyWin;
    }
}
