// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryGroup extends cc.Component {
    

    public static Instance : HistoryGroup = null;


    @property(cc.Color)
    loseColor: cc.Color = null;

    @property(cc.Color)
    winColor: cc.Color = null;

    @property(cc.Node)
    historyHolder: cc.Node = null;


    protected onLoad(): void {
        HistoryGroup.Instance = this;
    }
}
