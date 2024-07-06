// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_HistoryBet extends cc.Component {

    @property(cc.Label)
    private sessionLabel : cc.Label = null;

    @property(cc.Label)
    private timeLabel : cc.Label = null;

    @property(cc.Label)
    private betLevelLabel : cc.Label = null;

    @property(cc.Label)
    private moneyWinLabel : cc.Label = null;

    @property(cc.Label)
    private descriptionLabel : cc.Label = null;

    
    @property(cc.Sprite)
    private sprite : cc.Sprite = null;

    public GetSprite(){
        return this.sprite;
    }

    public SetSessionLabel(session : number){
        this.sessionLabel.string = "x" + session;
    }

    public SetTimeLabel(){
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();

        this.timeLabel.string = hour + ":" + minute;
    }

    public SetBetLevelLabel(betLevel : number){
        if (betLevel >= 1000000) {
            this.betLevelLabel.string = (betLevel/1000000) + "M";
        } else if (betLevel >= 1000) {
            this.betLevelLabel.string = (betLevel/1000) + "K";
        } else {
            this.betLevelLabel.string = "" + betLevel;
        }
    }

    public SetMoneyWinLabel(moneyWin : number){
        if (moneyWin >= 1000000) {
            this.moneyWinLabel.string = (moneyWin/1000000) + "M";
        } else if (moneyWin >= 1000) {
            this.moneyWinLabel.string = (moneyWin/1000) + "K";
        } else {
            this.moneyWinLabel.string = "" + moneyWin;
        }
    }

    public SetDescriptionLabel(description : string){
        this.descriptionLabel.string = description;
    }
}
