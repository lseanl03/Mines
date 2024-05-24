// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BetGroup from "../GameplayUI/BetGroup";
import Item from "../GameplayUI/Item";
import PlayGroup from "../GameplayUI/PlayGroup";
import History from "../History";
import ProfitCostData from "../ProfitCostData";
import CenterGroup from "../UI/CenterGroup";
import WinPanel from "../WinPanel";
import EventManager from "./EventManager";
import GameplayUIManager from "./GameplayUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
 
    isBetting : boolean = false;

    minBetLevel : number = 5000;
    maxBetLevel : number = 5000000;
    minMine : number = 1;
    maxMine : number = 15;
    initMoney : number = 1000000;

    currentBetLevel : number = 0; 
    currentMoney : number = 0;
    currentMineAmount : number = 0;
    totalProfit : number = 0;
    profitOnNextTile : number = 0;
    itemIsOpenedAmount : number = 0;

    profitCostData : ProfitCostData = new ProfitCostData();

    @property(WinPanel)
    winPanel : WinPanel = null;

    static Instance : GameManager = null;

    onLoad(){
        GameManager.Instance = this;
        this.Init();
    }
    protected start(): void {
    }
    Init(){
        this.UpdateCurrentBetLevel(this.minBetLevel);
        this.UpdateCurrentMoney(this.initMoney);
    }

    UpdateCurrentMoney(value: number){
        this.currentMoney += value;
        GameplayUIManager.Instance.SetCurrentMoneyLabel(this.currentMoney);
    }

    BetMoney(value : number){
        this.UpdateCurrentMoney(-value);
    }

    UpdateCurrentBetLevel(value : number){
        if(this.isBetting) return;

        this.currentBetLevel = value;

        if(this.currentBetLevel < this.minBetLevel) this.currentBetLevel = this.minBetLevel;
        if(this.currentBetLevel > this.maxBetLevel) this.currentBetLevel = this.maxBetLevel;

        
        BetGroup.Instance.SetBetLevelLabel(this.currentBetLevel);
    }


    MoneyEnough(){
        return this.currentMoney >= this.currentBetLevel;
    }
    SetCurrentMineAmount(value : number){
        if(value < this.minMine || value > this.maxMine || this.isBetting) return;

        this.currentMineAmount = value;
        BetGroup.Instance.CheckChooseMineGroup(this.currentMineAmount);
    }

    SetBettingState(state : boolean){
        this.isBetting = state;
        BetGroup.Instance.betButton.SetButtonSprite(this.isBetting);
        BetGroup.Instance.BetButtonState(true);

    }

    GetNextCost(mineIsOpenedAmount : number){
        var mineData = this.profitCostData.profitMineData[this.currentMineAmount];
        if(mineData[mineIsOpenedAmount] == undefined ){
           // if(this.isBetting) UIManager.Instance.SetGameState(true);
            //else UIManager.Instance.SetGameState(false);            
        }
        return mineData[mineIsOpenedAmount];
    }

    GetCurrentCost(mineIsOpenedAmount : number){
        var mineData = this.profitCostData.profitMineData[this.currentMineAmount];
        return mineData[mineIsOpenedAmount];
    }
    UpdateTotalProfit(value : number){

        this.totalProfit = value;
    }

    UpdateProfitOnNextTile(){

        var costNextTile = this.GetNextCost(this.itemIsOpenedAmount);
        this.profitOnNextTile = costNextTile * this.currentBetLevel;
        
        //UIManager.Instance.profitGroup.SetProfitOnNextTile(this.profitOnNextTile, costNextTile);

    }

    ResetData(){
        this.totalProfit = 0;
        this.profitOnNextTile = 0;
        this.itemIsOpenedAmount = 0;

        this.SetBettingState(false);
    }
    CostNextTile(){
        return this.GetNextCost(this.itemIsOpenedAmount);
    }
    CurrentCost(){
        cc.log(this.itemIsOpenedAmount);
        return this.GetCurrentCost(this.itemIsOpenedAmount - 1);
    }


    SetGameState(isWin : boolean){
        if(!isWin){
            this.SetListItemEndGame();
        }
        else{
            this.UpdateCurrentMoney(this.totalProfit);
            this.WinPanelState(true);
        }
        this.ResetData();
    }

    SetListItemEndGame(){
        var itemGroup = PlayGroup.Instance.itemGroup;
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
           // itemComponent.isMineClicked = false;
            itemComponent.OnOpenItem();
    
        }
    }
    
    WinPanelState(state : boolean){
        this.winPanel.node.active = state;
    
        if(state == true){
            this.winPanel.costLabel.string = "Cost: x" + this.CurrentCost();
            this.winPanel.totalProfitLabel.string = "Total Profit: " + Math.round(this.totalProfit) + " VND";
        }
    }

    GetAmountItemIsOpened(){

        this.itemIsOpenedAmount = 0;
        
        var itemGroup = PlayGroup.Instance.itemGroup;
        
        for(var i = 0; i < itemGroup.childrenCount; i++){
            var item = itemGroup.children[i];
            var itemComponent = item.getComponent(Item);
            if(itemComponent.isOpened) this.itemIsOpenedAmount++;
        }

        // if(this.isBetting) this.UpdateTotalProfit(this.profitOnNextTile);
        // else this.UpdateTotalProfit(this.currentBetLevel);
        // this.UpdateProfitOnNextTile();
    }
}
