// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PopupBase extends cc.Component {

    @property(cc.Button)
    private closeButton : cc.Button = null;

    @property(cc.Node)
    private panel : cc.Node = null;

    protected onLoad(): void {
        this.closeButton.node.on('click', this.OnCloseButtonClick, this);
    }

    protected OnCloseButtonClick(){
        this.HidePopUp();
    }


    public ShowPopUp(){
        this.panel.active = this.node.active = true;
        this.panel.opacity = 0;
        this.panel.position = cc.v3(0,300,0);
        
        
        cc.tween(this.panel)
        .to(0.5, {opacity: 255, position: cc.v3(0,0,0)}, { easing: 'backOut'})
        .call(() => {
            this.closeButton.interactable = true;
        })
        .start();
    }

    protected HidePopUp(){
        this.panel.opacity = 255;
        this.panel.position = cc.v3(0,0,0);
        this.closeButton.interactable = false;
        
        cc.tween(this.panel)
        .to(0.5, {opacity: 0, position: cc.v3(0,300,0)}, { easing: 'backIn'})
        .call(() => {
            this.panel.active = this.node.active = false;
            
        })
        .start();
    }
}
