// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesGameplayUIManager extends cc.Component {

    public static Instance : MinesGameplayUIManager = null;

    @property(cc.Label)
    currentMoneyLabel : cc.Label = null;


    onLoad(){
        MinesGameplayUIManager.Instance = this;
    }

}
