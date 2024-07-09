// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesGameManager from "../Manager/Mines.GameManager";
import ChooseMine from "./Mines.ChooseMine";
import MinesItem, { ItemSpriteType } from "./Mine.Item";
import MinesBetButton from "./Mines.BetButton";
import MinesPlayGroup from "./Mines.PlayGroup";
import MinesInfoGroup from "./Mines.InfoGroup";
import MinesChooseMineGroup from "./Mines.ChooseMineGroup";
import MinesChooseBetGroup from "./Mines.ChooseBetGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesBetGroup extends cc.Component {

    static Instance : MinesBetGroup = null;

    @property(MinesInfoGroup)
    private infoGroup : MinesInfoGroup = null;

    @property(MinesChooseMineGroup)
    private chooseMineGroup : MinesChooseMineGroup = null;

    @property(MinesChooseBetGroup)
    private chooseBetGroup : MinesChooseBetGroup = null;

    @property(MinesBetButton)
    private betButton : MinesBetButton = null;

    
    protected onLoad(): void {
        MinesBetGroup.Instance = this;
        this.AddListener();
    }
    protected start(): void {
        this.Init();
    }

    private Init(){
        MinesGameManager.Instance.SetCurrentMineAmount(MinesGameManager.Instance.MinMine());
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
        const itemGroup = MinesPlayGroup.Instance.ItemGroup();
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(MinesItem);
            itemComponent.SetAnimActive(true);
            itemComponent.SetItemSprite(isShow);
        }
    }

    private GetRandomItemNone(){

        let itemComponent : MinesItem;

        do{
            let itemGroup = MinesPlayGroup.Instance.ItemGroup();
            let index = Math.round(Math.random() * (itemGroup.childrenCount - 1));
            itemComponent = itemGroup.children[index].getComponent(MinesItem);

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
        if(!MinesGameManager.Instance.MoneyEnough()) return;

        if(MinesGameManager.Instance.IsBetting() && MinesGameManager.Instance.ItemIsOpenedAmount() > 0){
            this.HandleStopOnClick();
            return;
        }

        if(MinesGameManager.Instance.IsBetting()) return;

        this.HandleBetOnClick();

    }

    private HandleStopOnClick(){
        MinesGameManager.Instance.SetBettingState(false);
        MinesGameManager.Instance.SetGameState(true);

    }

    private HandleBetOnClick(){
        
        this.BetButtonState(false);
        this.RandomMineToListItem();
        this.RandomListItem();
        
        
        MinesGameManager.Instance.GetAmountItemIsOpened();
        
        MinesGameManager.Instance.BetMoney(MinesGameManager.Instance.CurrentBetLevel());
        MinesGameManager.Instance.SetBettingState(true);

        MinesPlayGroup.Instance.HandleOnBet();
    }

    private RandomMineToListItem(){
        this.ResetListItem();

        const currentMineAmount = MinesGameManager.Instance.CurrentMineAmount();
        
        for(let i = 0; i < currentMineAmount; i++){
            let itemComponentNone = this.GetRandomItemNone();
            itemComponentNone.SetItemSpriteType(ItemSpriteType.Mine);
        }
    }

    private RandomListItem(){

        const itemGroup = MinesPlayGroup.Instance.ItemGroup();
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(MinesItem);
            
            if(itemComponent.ItemType() == ItemSpriteType.None){
                itemComponent.SetItemSpriteType(ItemSpriteType.Diamond);
            }
        }
    }



    private ResetListItem(){
        const itemGroup = MinesPlayGroup.Instance.ItemGroup();
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(MinesItem);
            itemComponent.SetItemSpriteType(ItemSpriteType.None);
            itemComponent.SetItemSpriteState(false);
        }
    }





}
