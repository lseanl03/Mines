// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import History from "../History";
import ProfitCostData from "../ProfitCostData";
import CenterGroup from "../UI/CenterGroup";
import EventManager from "./EventManager";
import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
 
    isBetting : boolean = false;
    minBetLevel : number = 10000;
    maxBetLevel : number = 1280000;
    currentBetLevel : number = 10000; 
    currentMoney : number = 1000000;
    currentMineAmount : number = 0;
    totalProfit : number = 0;
    profitOnNextTile : number = 0;
    itemIsOpenedAmount : number = 0;

    profitCostData : ProfitCostData = new ProfitCostData();

    @property(cc.SpriteFrame)
    primogemSprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    mineSprite : cc.SpriteFrame = null;

    @property(cc.Color)
    primogemColor : cc.Color = null;

    @property(cc.Color)
    mineColor : cc.Color = null;

    @property(cc.Prefab)
    historyPrefab : cc.Prefab = null;

    static Instance : GameManager = null;

    onLoad(){
        GameManager.Instance = this;
        this.Init();
    }
    protected start(): void {
        EventManager.emit("test");
    }
    Init(){
    }


    UpdateCurrentMoney(value: number){
        this.currentMoney += value;
        UIManager.Instance.SetCurrentMoneyLabel(this.currentMoney);
    }

    BetMoney(value : number){
        this.UpdateCurrentMoney(-value);
    }

    UpdateCurrentBetLevel(value : number){
        if(this.isBetting) return;

        this.currentBetLevel = value;

        if(!this.MoneyEnough()) this.CheckCurrentBetLevel();
        if(this.currentBetLevel < this.minBetLevel) this.currentBetLevel = this.minBetLevel;
        if(this.currentBetLevel > this.maxBetLevel) this.currentBetLevel = this.maxBetLevel;

        
        UIManager.Instance.SetCurrentBetLevelLabel(this.currentBetLevel);
    }

    CheckCurrentBetLevel(){
        do{
            this.currentBetLevel /= 2;      
            if(this.currentBetLevel <= this.minBetLevel) break;  
        }while(!this.MoneyEnough());
    }

    MoneyEnough(){
        return this.currentMoney >= this.currentBetLevel;
    }
    SetCurrentMineAmount(value : number){
        this.currentMineAmount = value;
    }

    SetBettingState(state : boolean){
        this.isBetting = state;

        UIManager.Instance.SetMineSliderState(!state);
    }

    GetNextCost(mineIsOpenedAmount : number){
        var mineData = this.profitCostData.profitMineData[this.currentMineAmount];
        if(mineData[mineIsOpenedAmount] == undefined ){
            if(this.isBetting) UIManager.Instance.SetGameState(true);
            else UIManager.Instance.SetGameState(false);            
        }
        return mineData[mineIsOpenedAmount];
    }

    GetCurrentCost(mineIsOpenedAmount : number){
        var mineData = this.profitCostData.profitMineData[this.currentMineAmount];
        return mineData[mineIsOpenedAmount];
    }
    UpdateTotalProfit(value : number){

        this.totalProfit = value;
        UIManager.Instance.profitGroup.SetTotalProfit(this.totalProfit);
    }

    UpdateProfitOnNextTile(){

        var costNextTile = this.GetNextCost(this.itemIsOpenedAmount);
        this.profitOnNextTile = costNextTile * this.currentBetLevel;
        
        UIManager.Instance.profitGroup.SetProfitOnNextTile(this.profitOnNextTile, costNextTile);

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

    public SpawnHistory(isWin : boolean){     

        var lastNodeIndex = UIManager.Instance.historyGroup.historyHolder.childrenCount - 1;

        var history = cc.instantiate(this.historyPrefab);

        history.setParent(UIManager.Instance.historyGroup.historyHolder);
        history.setSiblingIndex(0);
        history.getComponent(History).Anim();
        if(isWin) history.getComponent(History).SetTotalProfit(this.totalProfit);
        else history.getComponent(History).SetTotalProfit(0);
        

        if(UIManager.Instance.historyGroup.historyHolder.childrenCount >= 15){
            UIManager.Instance.historyGroup.historyHolder.children[lastNodeIndex].destroy();
        }
    }
}
