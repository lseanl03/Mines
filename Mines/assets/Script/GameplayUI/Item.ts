// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";
import GameManager from "../Manager/GameManager";
import GameplayUIManager from "../Manager/GameplayUIManager";
import PlayGroup from "./PlayGroup";


const {ccclass, property} = cc._decorator;


export enum ItemSpriteType{
    None,
    Diamond,
    Mine
}
@ccclass
export default class Item extends ButtonBase {

    isMineClicked : boolean = false;
    isOpened : boolean = false;
    itemSprite : cc.Sprite = null;
    anim : sp.Skeleton = null;
    itemType: ItemSpriteType = ItemSpriteType.None;
    
    
    @property(cc.SpriteFrame)
    itemHideSprite : cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    itemShowSprite : cc.SpriteFrame = null;


    onLoad(){
        super.onLoad();
        this.itemSprite = this.node.getComponent(cc.Sprite);
        this.anim = this.getComponentInChildren(sp.Skeleton);

        this.node.on('click', this.OnClick, this);

        this.anim.setCompleteListener((trackEntry, loopCount) => {
            this.onAnimationComplete(trackEntry, loopCount);
        });
    }
    onAnimationComplete(trackEntry, loopCount) {
        if (this.itemType == ItemSpriteType.Mine && this.isMineClicked) {

            this.anim.node.active = false;

            PlayGroup.Instance.anim.node.position = this.node.position;
            PlayGroup.Instance.anim.setAnimation(0, '5', false);
        }
        else if(this.itemType == ItemSpriteType.Diamond){
            this.anim.setAnimation(0, '8', true);
        }
        this.isMineClicked = false;          
    }

    protected start(): void {
        this.Init();
    }

    Init(){
        this.SetItemSprite(false);
        this.SetItemSpriteType(ItemSpriteType.None);


    }


    SetItemSpriteState(state : boolean){
        this.itemSprite.enabled = state;

        if(state){
            this.anim.clearTracks();
            this.anim.setToSetupPose();
        }
    }

    SetItemSprite(isShow : boolean){
        if(isShow) this.itemSprite.spriteFrame = this.itemShowSprite;
        else this.itemSprite.spriteFrame = this.itemHideSprite;
    }

    SetItemSpriteType(type : ItemSpriteType){
        this.itemType = type;

        if(type != ItemSpriteType.None){
            this.StopAnim();
            this.SetItemEffect();
            this.SetItemSpriteState(true);
            this.isOpened = false;
        }
    }

    PlayAnim(isMine : boolean, canLoop : boolean){

        if(isMine) this.anim.setAnimation(0, '6', canLoop);
        else this.anim.setAnimation(0, '7', canLoop);
    }

    StopAnim(){
        this.anim.clearTracks();
    }


    OnClick() {

        if(!GameManager.Instance.isBetting) return;

        if(this.itemType == ItemSpriteType.Mine){
            this.isMineClicked = true;
        } 
        this.OnOpenItem();
    }

    override EffectActive(value: any): void {

        if(!GameManager.Instance.isBetting || this.isOpened) return; 
        super.EffectActive(value);    
    }

    OnOpenItem(){
        if(this.isOpened || !GameManager.Instance.isBetting) return;

        this.isOpened = true;
        this.SetItemSpriteState(false);
        this.PlayAnim(this.itemType == ItemSpriteType.Mine, false);
    
        this.CheckInfo();
    }

    CheckInfo(){

        if(this.itemType == ItemSpriteType.Mine){
            GameManager.Instance.SetGameState(false);
        }
        GameManager.Instance.GetAmountItemIsOpened();
    }

    SetItemEffect(){
        this.node.scale = 1;
        
        cc.tween(this.node)
        .to(0.2, { scale: 1.1})
        .to(0.1, { scale: 1})
        .start();
    }

}
