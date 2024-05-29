// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_WinPanel extends cc.Component {

    @property(cc.Label)
    private costLabel: cc.Label = null;

    @property(cc.Label)
    private totalProfitLabel: cc.Label = null;

    private hideTime : number = 0.5;

    protected onEnable(): void {
        this.Anim();
    }
    Anim(){
        
        this.node.opacity = 255;

        cc.tween(this.node)
        .to(1, {opacity: 255})
        .to(this.hideTime, {opacity: 0})
        .call(() => {
            this.node.active = false;
        })
        .start();
    }

    SetCostLabel(cost : number){
        this.costLabel.string = "Cost: x" + cost;
    }

    SetTotalProfitLabel(totalProfit : number){
        this.totalProfitLabel.string = "Total Profit: " + Math.round(totalProfit) + " VND";
    }
}
