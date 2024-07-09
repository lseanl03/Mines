// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesHistoryBetPopup from "../PopupUI/Mines.HistoryBetPopup";
import MinesHowToPlayPopup from "../PopupUI/Mines.HowToPlayPopup";
import MinesTopBetPopup from "../PopupUI/Mines.TopBetPopup";
import MinesUserNamePopup from "../PopupUI/Mines.UserNamePopup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesPopupUIManager extends cc.Component {
    
    static Instance : MinesPopupUIManager = null;

    @property(MinesUserNamePopup)
    private userNamePopup : MinesUserNamePopup = null;

    @property(MinesHistoryBetPopup)
    private historyBetPopup : MinesHistoryBetPopup = null;

    @property(MinesTopBetPopup)
    private topBetPopup : MinesTopBetPopup = null;

    @property(MinesHowToPlayPopup)
    private howToPlayPopup : MinesHowToPlayPopup = null;

    onLoad(){
        MinesPopupUIManager.Instance = this;
    }

    public ShowTopBetPopup(){
        this.topBetPopup.ShowPopUp();
    }

    public ShowHistoryBetPopup(){
        this.historyBetPopup.ShowPopUp();
    }

    public ShowHowToPlayPopup(){
        this.howToPlayPopup.ShowPopUp();
    }




    public GetUserNamePopup(){
        return this.userNamePopup;
    }

    public GetHistoryBetPopup(){
        return this.historyBetPopup;
    }

    public GetTopBetPopup(){
        return this.topBetPopup;
    }


}
