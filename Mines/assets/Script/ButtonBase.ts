// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ItemBase from "./ItemBase";
import GameManager from "./Manager/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonBase extends ItemBase {

    protected override onMouseDown(event: cc.Event.EventMouse): void {
        super.onMouseDown(event);
    }
    protected override onMouseUp(event: cc.Event.EventMouse): void {
        super.onMouseUp(event);
    }
    protected override onMouseLeave(event: cc.Event.EventMouse): void {
        super.onMouseLeave(event);
    }
}
