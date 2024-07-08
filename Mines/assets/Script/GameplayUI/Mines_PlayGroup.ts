// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_PlayGroup extends cc.Component {

    static Instance : Mines_PlayGroup = null;
    @property(cc.Node)
    private itemGroup : cc.Node = null;

    @property(sp.Skeleton)
    private animBomb : sp.Skeleton = null;

    @property(cc.Label)
    private diamondsFoundLabel : cc.Label = null;

    @property(cc.RichText)
    private flipAgainLabel : cc.RichText = null;

    @property(cc.RichText)
    private multiplierLabel : cc.RichText = null;

    onLoad(){
        Mines_PlayGroup.Instance = this;

        this.SetDiamondsFoundLabel(0, 0);
        this.SetFlipAgainLabel(0);
        this.SetMultiplierLabel(0);
    }


    //Get Set

    public ItemGroup(){
        return this.itemGroup;
    }

    public AnimBomb(){
        return this.animBomb;
    }

    public SetDiamondsFoundLabel(diamondsFound : number, diamondsTotal : number){
        this.diamondsFoundLabel.string = "Diamonds found: " + diamondsFound + "/" + diamondsTotal;
    }

    public SetFlipAgainLabel(flipAgain : number){
        if (flipAgain >= 1000000) {
            this.flipAgainLabel.string = "Flip again: <color=#FFE000>" + (flipAgain/1000000) + "M</color>";
        } else if (flipAgain >= 1000) {
            this.flipAgainLabel.string = "Flip again: <color=#FFE000>" + (flipAgain/1000) + "K</color>";
        } else {
            this.flipAgainLabel.string = "Flip again: <color=#FFE000>" + flipAgain + "</color>";
        }
    }

    public SetMultiplierLabel(multiplier : number){
        this.multiplierLabel.string = "Multiplier: <color=#D493FF>x" + multiplier + "</color>";
    }

    public HandleOnBet(){

    }

    public HandleOnStop(){
        
    }

}
