// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_PlayGroup extends cc.Component {

    static Instance : Mines_PlayGroup = null;
    @property(cc.Node)
    private itemGroup : cc.Node = null;

    @property(sp.Skeleton)
    private animBomb : sp.Skeleton = null;

    onLoad(){
        Mines_PlayGroup.Instance = this;
    }


    //Get Set

    public ItemGroup(){
        return this.itemGroup;
    }

    public AnimBomb(){
        return this.animBomb;
    }

}
