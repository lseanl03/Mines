// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CenterDisplayer from "../CenterDisplayer";
import Displayer from "./Displayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CenterGroup extends cc.Component {

    public static instance : CenterGroup = null;

    @property(Displayer)
    primogemDisplayer : Displayer = null;

    @property(Displayer)
    mineDisplayer : Displayer = null;

    @property(CenterDisplayer)
    centerDisplayer : CenterDisplayer = null;

    onLoad(){
        CenterGroup.instance = this;
    }

    SetPrimogem(amount : number){
        this.primogemDisplayer.SetAmountLabel(amount);
    }

    SetMine(amount : number){
        this.mineDisplayer.SetAmountLabel(amount);
    }

    GetAmountItem(){
        return this.centerDisplayer.itemGroupNode.childrenCount;
    }

    // Init(){
    //     this.MineInit();
    // }

    // MineInit(){
    // }
}
