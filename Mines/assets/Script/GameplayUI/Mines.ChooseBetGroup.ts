// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesChooseBet from "./Mines.ChooseBet";
import MinesChooseMine from "./Mines.ChooseMine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesChooseBetGroup extends cc.Component {

    @property(cc.Label)
    private chooseBetLevelLabel : cc.Label = null;

    public SetBetLevelLabel(betLevel : number){

        if (betLevel >= 1000000) {
            this.chooseBetLevelLabel.string = (betLevel/1000000) + "M";
        } else if (betLevel >= 1000) {
            this.chooseBetLevelLabel.string = (betLevel/1000) + "K";
        } else {
            this.chooseBetLevelLabel.string = "" + betLevel;
        }
    }
}
