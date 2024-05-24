// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import GameplayUIManager from "../Manager/GameplayUIManager";
import BetButton from "./BetButton";
import ChooseMine from "./ChooseMine";
import Item, { ItemSpriteType } from "./Item";
import PlayGroup from "./PlayGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetGroup extends cc.Component {

    static Instance : BetGroup = null;
    
    @property(cc.Button)
    defaultModeButton : cc.Button = null;

    @property(cc.Button)
    autoPlayModeButton : cc.Button = null;

    @property(cc.Button)
    subButton : cc.Button = null;

    @property(cc.Button)
    sumButton : cc.Button = null;
    
    @property(cc.Label)
    chooseMineViewLabel : cc.Label = null;

    @property(BetButton)
    betButton : BetButton = null;

    @property(cc.Label)
    chooseBetLevelLabel : cc.Label = null;

    @property(ChooseMine)
    chooseMine : ChooseMine[] = [];
    
    protected onLoad(): void {
        BetGroup.Instance = this;
        this.AddListener();
    }
    protected start(): void {
        this.Init();
    }

    Init(){
        GameManager.Instance.SetCurrentMineAmount(GameManager.Instance.minMine);
        this.SetChooseMineViewLabel(GameManager.Instance.currentMineAmount);

    }

    AddListener(){
        this.betButton.node.on('click', this.OnBetButtonClick, this);
        this.subButton.node.on('click', this.OnSubButtonClick, this);
        this.sumButton.node.on('click', this.OnSumButtonClick, this);


    }

    BetButtonState(state : boolean){
        this.subButton.interactable = state;
        this.sumButton.interactable = state;
    }


    OnBetButtonClick(){
        if(!GameManager.Instance.MoneyEnough()) return;

        if(GameManager.Instance.isBetting && GameManager.Instance.itemIsOpenedAmount > 0){
            cc.log("HandleCashOutOnClick");
            this.HandleStopOnClick();
            return;
        }

        if(GameManager.Instance.isBetting) return;

        cc.log("HandleBetOnClick");
        this.HandleBetOnClick();

    }

    HandleStopOnClick(){
        GameManager.Instance.SetBettingState(false);
        GameManager.Instance.SetGameState(true);

    }

    HandleBetOnClick(){
        
        this.BetButtonState(false);
        this.RandomMineToListItem();
        this.RandomListItem();
        
        
        GameManager.Instance.GetAmountItemIsOpened();
        
        GameManager.Instance.BetMoney(GameManager.Instance.currentBetLevel);
        GameManager.Instance.SetBettingState(true);
    }

    RandomMineToListItem(){
        this.ResetListItem();

        var currentMineAmount = GameManager.Instance.currentMineAmount;
        
        for(var i = 0; i < currentMineAmount; i++){
            var itemComponentNone = this.GetRandomItemNone();
            itemComponentNone.SetItemSpriteType(ItemSpriteType.Mine);
        }
    }

    RandomListItem(){

        var itemGroup = PlayGroup.Instance.itemGroup;
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            
            if(itemComponent.itemType == ItemSpriteType.None){
                itemComponent.SetItemSpriteType(ItemSpriteType.Diamond);
            }
        }
        cc.log("Done");
    }

    SetItemSprite(isShow : boolean){
        var itemGroup = PlayGroup.Instance.itemGroup;
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            itemComponent.SetItemSprite(isShow);
        }
    }

    GetRandomItemNone(){

        do{
            var itemGroup = PlayGroup.Instance.itemGroup;
            var index = Math.round(Math.random() * (itemGroup.childrenCount - 1));
            var itemComponent = itemGroup.children[index].getComponent(Item);

        }while(itemComponent.itemType != ItemSpriteType.None);

        return itemComponent;
    }


    GetAmountItemIsOpened(){

        GameManager.Instance.itemIsOpenedAmount = 0;
        
        var itemGroup = PlayGroup.Instance.itemGroup;
        
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            if(itemComponent.isOpened) GameManager.Instance.itemIsOpenedAmount++;
        }

        if(GameManager.Instance.isBetting) GameManager.Instance.UpdateTotalProfit(GameManager.Instance.profitOnNextTile);
        else GameManager.Instance.UpdateTotalProfit(GameManager.Instance.currentBetLevel);
        GameManager.Instance.UpdateProfitOnNextTile();
    }


    ResetListItem(){
        var itemGroup = PlayGroup.Instance.itemGroup;
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            itemComponent.SetItemSpriteType(ItemSpriteType.None);
            itemComponent.SetItemSpriteState(false);
        }
    }


    OnSubButtonClick(){
        GameManager.Instance.SetCurrentMineAmount(GameManager.Instance.currentMineAmount - 1);
        this.SetChooseMineViewLabel(GameManager.Instance.currentMineAmount);
    }

    OnSumButtonClick(){
        GameManager.Instance.SetCurrentMineAmount(GameManager.Instance.currentMineAmount + 1);
        this.SetChooseMineViewLabel(GameManager.Instance.currentMineAmount);
    }

    SetChooseMineViewLabel(value : number){
        this.chooseMineViewLabel.string = value.toString();
    }

    SetBetLevelLabel(betLevel : number){

        if (betLevel >= 1000000) {
            this.chooseBetLevelLabel.string = (betLevel/1000000) + "M";
        } else if (betLevel >= 1000) {
            this.chooseBetLevelLabel.string = (betLevel/1000) + "K";
        } else {
            this.chooseBetLevelLabel.string = "" + betLevel;
        }
    }

    CheckChooseMineGroup(value){
        for(let i = 0; i < this.chooseMine.length; i++){
            if(this.chooseMine[i].mineAmount == value){
                this.chooseMine[i].SetMineBorderSpriteState(true);
            }
            else{
                this.chooseMine[i].SetMineBorderSpriteState(false);
            }
        }
    }

    SetBetLevel(value : number){
        GameManager.Instance.UpdateCurrentBetLevel(value);
    }
}
