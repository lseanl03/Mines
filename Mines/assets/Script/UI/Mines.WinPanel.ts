// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesWinPanel extends cc.Component {

    @property(cc.RichText)
    private costLabel: cc.RichText = null;

    @property(cc.RichText)
    private totalProfitLabel: cc.RichText = null;

    protected onEnable(): void {
        this.Anim();
    }
    Anim(){
        
        this.node.opacity = 255;

        cc.tween(this.node)
        .to(2, {opacity: 255})
        .to(0.3, {opacity: 0})
        .call(() => {
            this.node.active = false;
        })
        .start();
    }

    SetCostLabel(cost : number){
        this.costLabel.string = "Cost: <color=#29FF00> x" + cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</color>";
    }

    SetTotalProfitLabel(totalProfit : number){
        this.totalProfitLabel.string = "Total Profit: <color=#FFE000>" + totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "VND</color>";
    }
}
