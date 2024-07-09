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

        this.historyBetPopup.GetCloseButton().node.on('click', this.OnCloseHistoryBetPopup, this);
        this.topBetPopup.GetCloseButton().node.on('click', this.OnCloseTopBetPopup, this);
        this.howToPlayPopup.GetCloseButton().node.on('click', this.OnCloseHowToPlayPopup, this);
    }

    private OnCloseTopBetPopup(){
        this.HidePopUp(this.topBetPopup.GetPanel(), this.topBetPopup.GetCloseButton(), this.topBetPopup.node);
    }

    private OnCloseHistoryBetPopup(){
        this.HidePopUp(this.historyBetPopup.GetPanel(), this.historyBetPopup.GetCloseButton(), this.historyBetPopup.node);
    }

    private OnCloseHowToPlayPopup(){
        this.HidePopUp(this.howToPlayPopup.GetPanel(), this.howToPlayPopup.GetCloseButton(), this.howToPlayPopup.node);
    }

    public ShowTopBetPopup(){
        this.ShowPopUp(this.topBetPopup.GetPanel(), this.topBetPopup.GetCloseButton(), this.topBetPopup.node);
    }

    public ShowHistoryBetPopup(){
        this.ShowPopUp(this.historyBetPopup.GetPanel(), this.historyBetPopup.GetCloseButton(), this.historyBetPopup.node);
    }

    public ShowHowToPlayPopup(){
        this.ShowPopUp(this.howToPlayPopup.GetPanel(), this.howToPlayPopup.GetCloseButton(), this.howToPlayPopup.node);
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

    ShowPopUp(panel : cc.Node, button : cc.Button, self : cc.Node){
        self.active = true;
        panel.active = true;
        panel.opacity = 0;
        panel.position = cc.v3(0,300,0);
        
        
        cc.tween(panel)
        .to(0.5, {opacity: 255, position: cc.v3(0,0,0)}, { easing: 'backOut'})
        .call(() => {
            button.interactable = true;
        })
        .start();
    }
    HidePopUp(panel : cc.Node, button : cc.Button, self : cc.Node){
        panel.opacity = 255;
        panel.position = cc.v3(0,0,0);
        button.interactable = false;
        
        cc.tween(panel)
        .to(0.5, {opacity: 0, position: cc.v3(0,300,0)}, { easing: 'backIn'})
        .call(() => {
            panel.active = false;
            self.active = false;
            
        })
        .start();
    }
}
