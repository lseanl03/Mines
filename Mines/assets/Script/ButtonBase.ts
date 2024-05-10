// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Item from "./Item";
import ItemBase from "./ItemBase";
import ButtonManager from "./Manager/ButtonManager";
import GameManager from "./Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonBase extends ItemBase {

    protected override onMouseDown(event: cc.Event.EventMouse): void {
        super.onMouseDown(event);
        this.Active();         
    }
    protected override onMouseUp(event: cc.Event.EventMouse): void {
        super.onMouseUp(event);
        this.Deactive();
    }
    protected override onMouseLeave(event: cc.Event.EventMouse): void {
        super.onMouseLeave(event);
        this.Deactive();    
    }

    protected Active(){
        if(GameManager.Instance.isBetting) return;
        this.node.color = ButtonManager.Instance.clickColor;
    }
    protected Deactive(){
        if(GameManager.Instance.isBetting) return;
        this.node.color = ButtonManager.Instance.defaultColor;
    }
}
