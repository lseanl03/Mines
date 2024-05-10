// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CenterDisplayer extends cc.Component {
    
    @property(cc.Node)
    itemGroupNode : cc.Node = null;

    itemListState(state : boolean){
        this.itemGroupNode.children.forEach(element => {
            element.active = state;
        });
    }
}
