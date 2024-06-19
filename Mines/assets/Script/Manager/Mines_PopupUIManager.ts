// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_UserNamePopup from "../PopupUI/Mines_UserNamePopup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_PopupUIManager extends cc.Component {
    
    static Instance : Mines_PopupUIManager = null;

    @property(Mines_UserNamePopup)
    private userNamePopup : Mines_UserNamePopup = null;

    onLoad(){
        Mines_PopupUIManager.Instance = this;
    }

    public GetUserNamePopup(){
        return this.userNamePopup;
    }
}
