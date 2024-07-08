// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_GameManager from "../Manager/Mines_GameManager";
import ChooseMine from "./Mines_ChooseMine";
import Mines_Item, { ItemSpriteType } from "./Mine_Item";
import Mines_BetButton from "./Mines_BetButton";
import Mines_PlayGroup from "./Mines_PlayGroup";
import Mines_InfoGroup from "./Mines_InfoGroup";
import Mines_ChooseMineGroup from "./Mines_ChooseMineGroup";
import Mines_ChooseBetGroup from "./Mines_ChooseBetGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_BetGroup extends cc.Component {

    static Instance : Mines_BetGroup = null;

    @property(Mines_InfoGroup)
    private infoGroup : Mines_InfoGroup = null;

    @property(Mines_ChooseMineGroup)
    private chooseMineGroup : Mines_ChooseMineGroup = null;

    @property(Mines_ChooseBetGroup)
    private chooseBetGroup : Mines_ChooseBetGroup = null;

    @property(Mines_BetButton)
    private betButton : Mines_BetButton = null;

    
    protected onLoad(): void {
        Mines_BetGroup.Instance = this;
        this.AddListener();
    }
    protected start(): void {
        this.Init();
    }

    private Init(){
        Mines_GameManager.Instance.SetCurrentMineAmount(Mines_GameManager.Instance.MinMine());
    }

    AddListener(){
        this.betButton.node.on('click', this.OnBetButtonClick, this);
    }

    //Get Set

    public GetInfoGroup(){
        return this.infoGroup;
    }

    public GetChooseMineGroup(){
        return this.chooseMineGroup;
    }

    public GetChooseBetGroup(){
        return this.chooseBetGroup;
    }

    public BetButton(){
        return this.betButton;
    }


    public BetButtonState(state : boolean){
        this.GetChooseMineGroup().SetButtonState(state);
    }

    public SetItemSprite(isShow : boolean){
        const itemGroup = Mines_PlayGroup.Instance.ItemGroup();
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(Mines_Item);
            itemComponent.SetAnimActive(true);
            itemComponent.SetItemSprite(isShow);
        }
    }

    private GetRandomItemNone(){

        let itemComponent : Mines_Item;

        do{
            let itemGroup = Mines_PlayGroup.Instance.ItemGroup();
            let index = Math.round(Math.random() * (itemGroup.childrenCount - 1));
            itemComponent = itemGroup.children[index].getComponent(Mines_Item);

        }while(itemComponent.ItemType() != ItemSpriteType.None);

        return itemComponent;
    }

    // private GetAmountItemIsOpened(): void {

    //     Mines_GameManager.Instance.SetItemIsOpenedAmount(0);
        
    //     const itemGroup = Mines_PlayGroup.Instance.ItemGroup();
        
    //     for (let i = 0; i < itemGroup.childrenCount; i++) {
    //         let item = itemGroup.children[i];
    //         let itemComponent = item.getComponent(Mines_Item);
    //         if (itemComponent.IsOpened()) {
    //             Mines_GameManager.Instance.SetItemIsOpenedAmount(Mines_GameManager.Instance.ItemIsOpenedAmount() + 1);
    //         }
    //     }

    //     if (Mines_GameManager.Instance.IsBetting()) {
    //         Mines_GameManager.Instance.SetTotalProfit(Mines_GameManager.Instance.ItemIsOpenedAmount());
    //     } else {
    //         Mines_GameManager.Instance.SetTotalProfit(Mines_GameManager.Instance.CurrentBetLevel());
    //     }
    //     Mines_GameManager.Instance.GetProfitOnNextTile();
    // }



    private OnBetButtonClick(){
        if(!Mines_GameManager.Instance.MoneyEnough()) return;

        if(Mines_GameManager.Instance.IsBetting() && Mines_GameManager.Instance.ItemIsOpenedAmount() > 0){
            this.HandleStopOnClick();
            return;
        }

        if(Mines_GameManager.Instance.IsBetting()) return;

        this.HandleBetOnClick();

    }

    private HandleStopOnClick(){
        Mines_GameManager.Instance.SetBettingState(false);
        Mines_GameManager.Instance.SetGameState(true);

    }

    private HandleBetOnClick(){
        
        this.BetButtonState(false);
        this.RandomMineToListItem();
        this.RandomListItem();
        
        
        Mines_GameManager.Instance.GetAmountItemIsOpened();
        
        Mines_GameManager.Instance.BetMoney(Mines_GameManager.Instance.CurrentBetLevel());
        Mines_GameManager.Instance.SetBettingState(true);

        Mines_PlayGroup.Instance.HandleOnBet();
    }

    private RandomMineToListItem(){
        this.ResetListItem();

        const currentMineAmount = Mines_GameManager.Instance.CurrentMineAmount();
        
        for(let i = 0; i < currentMineAmount; i++){
            let itemComponentNone = this.GetRandomItemNone();
            itemComponentNone.SetItemSpriteType(ItemSpriteType.Mine);
        }
    }

    private RandomListItem(){

        const itemGroup = Mines_PlayGroup.Instance.ItemGroup();
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(Mines_Item);
            
            if(itemComponent.ItemType() == ItemSpriteType.None){
                itemComponent.SetItemSpriteType(ItemSpriteType.Diamond);
            }
        }
    }



    private ResetListItem(){
        const itemGroup = Mines_PlayGroup.Instance.ItemGroup();
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(Mines_Item);
            itemComponent.SetItemSpriteType(ItemSpriteType.None);
            itemComponent.SetItemSpriteState(false);
        }
    }





}
