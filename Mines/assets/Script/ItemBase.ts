// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemBase extends cc.Component {


    button : cc.Button = null;

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);

        this.button = this.node.getComponent(cc.Button);

    }
    protected Active(){}
    protected Deactive(){}

    protected onMouseEnter(event: cc.Event.EventMouse): void {
        this.EffectActive(1.05);
    }

    protected onMouseLeave(event: cc.Event.EventMouse): void {
        this.EffectActive(1);
    }

    protected onMouseDown(event: cc.Event.EventMouse): void {
        this.EffectActive(1);
    }
    protected onMouseUp(event: cc.Event.EventMouse): void {
        this.EffectActive(1.05);
    }

    
    EffectActive(value){
        if(this.button != null){
            if(this.button.interactable){
                cc.tween(this.node)
                .to(0.1, {scale: value})
                .start();
            }
        }
    }
}
