// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_HistoryBetPopup extends cc.Component {
    @property(cc.SpriteFrame)
    private lineDark : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private lineLight : cc.SpriteFrame = null;

    @property(cc.Node)
    private historyBetList : cc.Node = null;

    @property(cc.Prefab)
    private historyBetPrefab : cc.Prefab = null;


    protected onLoad(): void {
        this.SpawnHistoryBet();
        this.SpawnHistoryBet();
        this.SpawnHistoryBet();
        this.SpawnHistoryBet();
    }
    private SpawnHistoryBet(){
        let historyBet = cc.instantiate(this.historyBetPrefab);
        historyBet.setParent(this.historyBetList);

    }
}
