// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesHowToPlayPopup extends cc.Component {
    
        @property(cc.Button)
        private closeButton : cc.Button = null;

        @property(cc.Node)
        private panel : cc.Node = null;

        public GetCloseButton(){
            return this.closeButton;
        }

        public GetPanel(){
            return this.panel;
        }
}
