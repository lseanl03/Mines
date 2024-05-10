// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import HistoryGroup from "../HistoryGroup";
import Item, { ItemSpriteType } from "../Item";
import ProfitGroup from "../ProfitGroup";
import CenterGroup from "../UI/CenterGroup";
import ToolGroup from "../UI/ToolGroup";
import WinPanel from "../WinPanel";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    public static Instance : UIManager = null;

    @property(HistoryGroup)
    historyGroup : HistoryGroup = null;

    @property(CenterGroup)
    centerGroup : CenterGroup = null;

    @property(ToolGroup)
    toolGroup : ToolGroup = null;

    @property(ProfitGroup)
    profitGroup : ProfitGroup = null;

    @property(WinPanel)
    winPanel : WinPanel = null;

    onLoad(){
        UIManager.Instance = this;
        this.AddListener();
    }
    start(): void {
        this.Init();
        this.toolGroup.Init();
        this.profitGroup.Init();
    }

    AddListener(){
        this.toolGroup.pickRandomButton.node.on('click', this.PickRandomButtonOnClick, this);
        this.toolGroup.betButton.node.on('click', this.BetButtonOnClick, this);
        this.toolGroup.maxButton.node.on('click', this.MaxButtonOnClick, this);
        this.toolGroup.minButton.node.on('click', this.MinButtonOnClick, this);
        this.toolGroup.mulButton.node.on('click', this.MulButtonOnClick, this);
        this.toolGroup.divButton.node.on('click', this.DivButtonOnClick, this);
        this.toolGroup.mineSlider.node.on('slide', this.OnSlide, this);

    }
    OnSlide(){
        this.toolGroup.UpdateMine();
    }
    DivButtonOnClick(){
        GameManager.Instance.UpdateCurrentBetLevel(GameManager.Instance.currentBetLevel / 2);
    }
    MulButtonOnClick(){
        GameManager.Instance.UpdateCurrentBetLevel(GameManager.Instance.currentBetLevel * 2);
    }
    MinButtonOnClick(){
        GameManager.Instance.UpdateCurrentBetLevel(GameManager.Instance.minBetLevel);
    }
    MaxButtonOnClick(){
        GameManager.Instance.UpdateCurrentBetLevel(GameManager.Instance.maxBetLevel);
    }

    PickRandomButtonOnClick(){
    }

    BetButtonOnClick(){

        if(!GameManager.Instance.MoneyEnough()) return;

        if(GameManager.Instance.isBetting && GameManager.Instance.itemIsOpenedAmount > 0){
            this.HandleCashOutOnClick();
            return;
        }

        if(GameManager.Instance.isBetting) return;

        this.HandleBetOnClick();

    }

    Init(){
        this.SetCurrentBetLevelLabel(GameManager.Instance.currentBetLevel);
        this.SetCurrentMoneyLabel(GameManager.Instance.currentMoney);

        this.RandomMineToListItem();
        this.RandomListItem();

        GameManager.Instance.UpdateTotalProfit(GameManager.Instance.currentBetLevel);
        GameManager.Instance.UpdateProfitOnNextTile();
    }

    HandleCashOutOnClick(){
        this.toolGroup.BetButtonLabel("Bet");
        GameManager.Instance.SetBettingState(false);
        
        this.SetGameState(true);

    }

    HandleBetOnClick(){
        this.toolGroup.BetButtonLabel("Cash Out");

        this.RandomMineToListItem();
        this.RandomListItem();
        this.WinPanelState(false);


        this.profitGroup.SetProfitState(true);
        
        UIManager.Instance.GetAmountItemIsOpened();
        
        GameManager.Instance.BetMoney(GameManager.Instance.currentBetLevel);
        GameManager.Instance.SetBettingState(true);
    }


    SetCurrentMoneyLabel(currentMoney : number){
        this.toolGroup.currentMoneyLabel.string = "" + currentMoney + " VND";
    }
    SetCurrentBetLevelLabel(currentBetLevel : number){
        this.toolGroup.currentBetLevelLabel.string = "" + currentBetLevel + " VND";
    }

    RandomListItem(){
        var gameManager = GameManager.Instance;

        var itemGroup = this.centerGroup.centerDisplayer.itemGroupNode;
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            
            if(itemComponent.itemType == ItemSpriteType.none){
                itemComponent.SetInfo(ItemSpriteType.primogem, gameManager.primogemSprite, gameManager.primogemColor);  
                cc.log("ID: " + itemComponent.id + " Is Primogem");
            }
        }
        cc.log("Done");
    }
    RandomMineToListItem(){
        this.ResetListItem();

        var gameManager = GameManager.Instance;
        var currentMineAmount = gameManager.currentMineAmount;
        
        for(var i = 0; i < currentMineAmount; i++){
            var itemComponentNone = this.GetRandomItemNone();
            itemComponentNone.SetInfo(ItemSpriteType.mine, gameManager.mineSprite, gameManager.mineColor);
        }
    }

    GetRandomItemNone(){

        do{
            var itemGroup = this.centerGroup.centerDisplayer.itemGroupNode;
            var index = Math.round(Math.random() * (itemGroup.childrenCount - 1));
            var itemComponent = itemGroup.children[index].getComponent(Item);

        }while(itemComponent.itemType != ItemSpriteType.none);

        return itemComponent;
    }
    ResetListItem(){
        var itemGroup = this.centerGroup.centerDisplayer.itemGroupNode;
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            itemComponent.OpenGroupState(false);
            itemComponent.SetOverlayState(false);
            itemComponent.ResetEffect();
            itemComponent.SetInfo(ItemSpriteType.none, null, cc.Color.WHITE);
        }
    }

    SetMineSliderState(state : boolean){
        this.toolGroup.mineSlider.enabled = state;
    }


    GetAmountItemIsOpened(){

        GameManager.Instance.itemIsOpenedAmount = 0;
        
        var itemGroup = this.centerGroup.centerDisplayer.itemGroupNode;
        
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            if(itemComponent.isOpened) GameManager.Instance.itemIsOpenedAmount++;
        }

        if(GameManager.Instance.isBetting) GameManager.Instance.UpdateTotalProfit(GameManager.Instance.profitOnNextTile);
        else GameManager.Instance.UpdateTotalProfit(GameManager.Instance.currentBetLevel);
        GameManager.Instance.UpdateProfitOnNextTile();
    }
    

    SetGameState(isWin : boolean){
        cc.log(isWin);
        if(!isWin){
            this.SetListItemEndGame();
        }
        else{
            GameManager.Instance.UpdateCurrentMoney(GameManager.Instance.totalProfit);
            GameManager.Instance.SpawnHistory(isWin);
            this.WinPanelState(true);
        }
        
        this.profitGroup.SetProfitState(false);
        this.toolGroup.BetButtonLabel("Bet");
        GameManager.Instance.ResetData();
    }
    
    SetListItemEndGame(){
        var itemGroup = this.centerGroup.centerDisplayer.itemGroupNode;
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            itemComponent.OpenGroupState(true);
    
            if(!itemComponent.isOpened) itemComponent.SetOverlayState(true);
            
        }
    }
    
    WinPanelState(state : boolean){
        this.winPanel.node.active = state;
    
        if(state == true){
            this.winPanel.costLabel.string = "Cost: x" + GameManager.Instance.CurrentCost();
            this.winPanel.totalProfitLabel.string = "Total Profit: " + Math.round(GameManager.Instance.totalProfit) + " VND";
        }
    }
}