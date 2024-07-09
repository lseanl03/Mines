// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesInfoGroup extends cc.Component {

    @property(cc.Label)
    private userNameLabel : cc.Label = null;

    @property(cc.Label)
    private currentMoneyLabel : cc.Label = null;

    protected onLoad(): void {
        
    }
    protected start(): void {
        this.Init();
    }

    private Init(){
    }

    public SetUserNameLabel(userName : string){
        this.userNameLabel.string = userName;
    }

    public SetCurrentMoneyLabel(currentMoney : number){
        this.currentMoneyLabel.string = currentMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}
