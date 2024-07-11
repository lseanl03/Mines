// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";
import MinesAudioManager from "../Manager/Mines.AudioManager";
import MinesGameManager from "../Manager/Mines.GameManager";
import MinesPlayGroup from "./Mines.PlayGroup";


const {ccclass, property} = cc._decorator;


export enum ItemSpriteType{
    None,
    Diamond,
    Mine
}
@ccclass
export default class MinesItem extends ButtonBase {

    private isMineClicked : boolean = false;
    private isOpened : boolean = false;
    private itemSprite : cc.Sprite = null;
    private anim : sp.Skeleton = null;
    private itemType: ItemSpriteType = ItemSpriteType.None;
    
    
    @property(cc.SpriteFrame)
    private itemHideSprite : cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    private itemShowSprite : cc.SpriteFrame = null;


    onLoad(){
        super.onLoad();
        this.itemSprite = this.node.getComponent(cc.Sprite);
        this.anim = this.getComponentInChildren(sp.Skeleton);

        this.node.on('click', this.OnClick, this);

        this.anim.setCompleteListener((trackEntry, loopCount) => {
            this.onAnimationComplete(trackEntry, loopCount);
        });
    }

    start(): void {
        this.Init();
    }

    private Init(){
        this.SetItemSprite(false);
        this.SetItemSpriteType(ItemSpriteType.None);
    }

    //Get Set

    public IsOpened(){
        return this.isOpened;
    }

    public ItemType(){
        return this.itemType;
    }

    public SetAnimActive(state : boolean){
        this.anim.node.active = state;
    }


    public SetItemSpriteState(state : boolean){
        this.itemSprite.enabled = state;

        if(state){
            this.anim.clearTracks();
            this.anim.setToSetupPose();
        }
    }

    public SetItemSprite(isShow : boolean){
        if(isShow) this.itemSprite.spriteFrame = this.itemShowSprite;
        else this.itemSprite.spriteFrame = this.itemHideSprite;
    }

    public SetItemSpriteType(type : ItemSpriteType){
        this.itemType = type;

        if(type != ItemSpriteType.None){
            this.StopAnim();
            this.SetItemEffect();
            this.SetItemSpriteState(true);
            this.isOpened = false;
        }
    }


    
    override EffectActive(value: any): void {

        if(!MinesGameManager.Instance.IsBetting() || this.isOpened) return; 
        super.EffectActive(value);    
    }


    private CheckInfo(){

        const gameManager = MinesGameManager.Instance;

        if(this.itemType == ItemSpriteType.Mine){
            gameManager.SetBettingState(false);
            gameManager.SetGameState(false);
        }
        gameManager.GetAmountItemIsOpened();
    }
    private onAnimationComplete(trackEntry, loopCount) {

        const PlayGroup = MinesPlayGroup.Instance;

        if (this.itemType == ItemSpriteType.Mine && this.isMineClicked) {

            this.SetAnimActive(false);

            PlayGroup.AnimBomb().node.position = this.node.position;
            PlayGroup.AnimBomb().setAnimation(0, '5', false);

            MinesAudioManager.Instance.PlaySFX("Audio/Bomb");
        }
        else if(this.itemType == ItemSpriteType.Diamond){
            this.anim.setAnimation(0, '8', true);
        }
        this.isMineClicked = false;          
    }

    private PlayAnim(isMine : boolean, canLoop : boolean){

        if(isMine) this.anim.setAnimation(0, '6', canLoop);
        else this.anim.setAnimation(0, '7', canLoop);
    }

    private StopAnim(){
        this.anim.clearTracks();
    }

    private SetItemEffect(){
        this.node.scale = 1;
        
        cc.tween(this.node)
        .to(0.2, { scale: 1.1})
        .to(0.1, { scale: 1})
        .start();
    }



    OnClick() {

        
        if(!MinesGameManager.Instance.IsBetting()) return;

        if(this.itemType == ItemSpriteType.Mine){
            this.isMineClicked = true;
        } 
        this.OnOpenItem();
    }


    OnOpenItem(){
        if(this.isOpened || !MinesGameManager.Instance.IsBetting()) return;

        MinesAudioManager.Instance.PlaySFX("Audio/OnClickItem");

        this.isOpened = true;
        this.SetItemSpriteState(false);
        this.PlayAnim(this.itemType == ItemSpriteType.Mine, false);
        
        MinesPlayGroup.Instance.HandleOnItemOpen();

        this.CheckInfo();
    }

}
