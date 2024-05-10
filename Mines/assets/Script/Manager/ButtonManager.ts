// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import EventManager from "./EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonManager extends cc.Component {


    public static Instance : ButtonManager = null;

    @property(cc.Color)
    defaultColor : cc.Color = null;
    
    @property(cc.Color)
    clickColor : cc.Color = null;

    onLoad(){
        ButtonManager.Instance = this;
        this.Init();
    }
    Init(){
        EventManager.on("test", this.Test, this);
    }

    Test(){
        cc.log("test");
    }

}
