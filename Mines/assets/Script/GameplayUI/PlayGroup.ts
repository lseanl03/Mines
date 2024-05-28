// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayGroup extends cc.Component {

    static Instance : PlayGroup = null;
    @property(cc.Node)
    itemGroup : cc.Node = null;

    @property(sp.Skeleton)
    anim : sp.Skeleton = null;

    onLoad(){
        PlayGroup.Instance = this;
    }

}
