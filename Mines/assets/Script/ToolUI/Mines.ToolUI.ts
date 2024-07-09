// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesPopupUIManager from "../Manager/Mines.PopupUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesToolUI extends cc.Component {
    @property(cc.Button)
    private topBetButton : cc.Button = null;

    @property(cc.Button)
    private infoButton : cc.Button = null;

    @property(cc.Button)
    private howToPlayButton : cc.Button = null;

    @property(cc.Button)
    private historyButton : cc.Button = null;

    protected onLoad(): void {
        this.topBetButton.node.on('click', this.OnTopBetButtonClick, this);
        this.infoButton.node.on('click', this.OnInfoButtonClick, this);
        this.howToPlayButton.node.on('click', this.OnHowToPlayButtonClick, this);
        this.historyButton.node.on('click', this.OnHistoryButtonClick, this);
    }

    private OnTopBetButtonClick(){
        MinesPopupUIManager.Instance.ShowTopBetPopup();
    }
    
    private OnInfoButtonClick(){
    }
    
    private OnHowToPlayButtonClick(){
        MinesPopupUIManager.Instance.ShowHowToPlayPopup();
    }
    
    private OnHistoryButtonClick(){
        MinesPopupUIManager.Instance.ShowHistoryBetPopup();
    }
}
