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
import MinesAssetBundle from "./Mines.AssetBundle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesPopupUIManager extends cc.Component {
    
    static Instance : MinesPopupUIManager = null;

    private userNamePopupPath : string = 'Prefab/UserNamePopup';

    private howToPlayPopupPath : string = 'Prefab/HowToPlayPopup';

    private userNamePopup : MinesUserNamePopup = null;

    @property(MinesHistoryBetPopup)
    private historyBetPopup : MinesHistoryBetPopup = null;

    @property(MinesTopBetPopup)
    private topBetPopup : MinesTopBetPopup = null;

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
        if(!this.howToPlayPopup){
            MinesAssetBundle.Instance.bundle.load(this.howToPlayPopupPath, cc.Prefab, (error, prefab: cc.Prefab) => {
                const popup = cc.instantiate(prefab);
                popup.parent = this.node;
                this.howToPlayPopup = popup.getComponent(MinesHowToPlayPopup);
                this.howToPlayPopup.ShowPopUp();
            });
            return;
        }
        this.howToPlayPopup.ShowPopUp();
    }

    public ShowUserNamePopup(){
        if(!this.userNamePopup){
            MinesAssetBundle.Instance.bundle.load(this.userNamePopupPath, cc.Prefab, (error, prefab: cc.Prefab) => {
                const popup = cc.instantiate(prefab);
                popup.parent = this.node;
                this.userNamePopup = popup.getComponent(MinesUserNamePopup);
                this.userNamePopup.ShowCreatePopup();
            });
            return;
        }
        this.userNamePopup.ShowCreatePopup();
    
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
