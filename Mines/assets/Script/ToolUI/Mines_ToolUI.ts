// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_PopupUIManager from "../Manager/Mines_PopupUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_ToolUI extends cc.Component {
    @property(cc.Button)
    private topBetButton : cc.Button = null;

    @property(cc.Button)
    private infoButton : cc.Button = null;

    @property(cc.Button)
    private questionButton : cc.Button = null;

    @property(cc.Button)
    private historyButton : cc.Button = null;

    protected onLoad(): void {
        this.topBetButton.node.on('click', this.OnTopBetButtonClick, this);
        this.infoButton.node.on('click', this.OnInfoButtonClick, this);
        this.questionButton.node.on('click', this.OnQuestionButtonClick, this);
        this.historyButton.node.on('click', this.OnHistoryButtonClick, this);
    }

    private OnTopBetButtonClick(){
        Mines_PopupUIManager.Instance.ShowTopBetPopup();
    }
    
    private OnInfoButtonClick(){
    }
    
    private OnQuestionButtonClick(){
    }
    
    private OnHistoryButtonClick(){
        Mines_PopupUIManager.Instance.ShowHistoryBetPopup();
    }
}
