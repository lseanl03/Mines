// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "./ItemBase";
import GameManager from "./Manager/GameManager";
import UIManager from "./Manager/UIManager";

const {ccclass, property} = cc._decorator;

export enum ItemSpriteType {
    none,
    primogem,
    mine
}
@ccclass
export default class Item extends ButtonBase {


    id : number = 0;


    @property({type : cc.Enum(ItemSpriteType)})
    itemType : ItemSpriteType = ItemSpriteType.none;

    @property(cc.Node)
    itemGroupNode : cc.Node = null;

    @property(cc.Node)
    openGroupNode : cc.Node = null;

    @property(cc.Sprite)
    openBgSprite : cc.Sprite = null;

    @property(cc.Sprite)
    openIconSprite : cc.Sprite = null;

    @property(cc.Node)
    overlayNode : cc.Node = null;

    override onLoad(){
        super.onLoad();

        this.id = this.node.getSiblingIndex() + 1;
    }


    protected override Active(): void {

        if(this.isOpened || !GameManager.Instance.isBetting) return;

        this.isOpened = true;

        cc.tween(this.itemGroupNode)
        .to(0.2, { position : cc.v3(0, 10, 0)})
        .to(0.1, { position : cc.v3(0, 0, 0)})
        .call(() => {
            this.OpenItem();
        })

        .start();
    }

    override EffectActive(value: any): void {

        if(this.isOpened || !GameManager.Instance.isBetting) return; 
        super.EffectActive(value);    
    }

    OpenItem(){
        this.OpenGroupState(true);
        this.CheckInfo();
    }
    OpenGroupState(state : boolean){
        this.openGroupNode.active = state;
        
        if(state == false) this.isOpened = false;
    }

    SetInfo(type : ItemSpriteType, spriteFrame : cc.SpriteFrame, color : cc.Color){
        this.itemType = type;
        this.openBgSprite.node.color = color;
        this.openIconSprite.spriteFrame = spriteFrame;

    }
    SetOverlayState(state : boolean){
        this.overlayNode.active = state;
    }
    CheckInfo(){
        if(this.itemType == ItemSpriteType.mine){
            UIManager.Instance.SetGameState(false);
            UIManager.Instance.profitGroup.SetProfitState(false);
        }
        
        UIManager.Instance.GetAmountItemIsOpened();
    }
    ResetEffect(){
        cc.tween(this.itemGroupNode)
        .to(0.2, { scale : 1.1})
        .to(0.1, { scale : 1})
        .start();
    }
}