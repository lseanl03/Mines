// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_BetGroup from "../GameplayUI/Mines_BetGroup";
import Mines_Item from "../GameplayUI/Mine_Item";
import Mines_PlayGroup from "../GameplayUI/Mines_PlayGroup";
import ProfitCostData from "../ProfitCostData";
import Mines_WinPanel from "../Mines_WinPanel";
import Mines_GameplayUIManager from "./Mines_GameplayUIManager";
import Mines_DataManager from "./Mines_DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_GameManager extends cc.Component {
 
    private isBetting : boolean = false;
    private minBetLevel : number = 5000;
    private maxBetLevel : number = 5000000;
    private minMine : number = 1;
    private maxMine : number = 15;
    private initMoney : number = 1000000;

    private currentBetLevel : number = 0; 
    private currentMoney : number = 0;
    private currentMineAmount : number = 0;
    private totalProfit : number = 0;
    private profitOnNextTile : number = 0;
    private itemIsOpenedAmount : number = 0;

    private profitCostData : ProfitCostData = new ProfitCostData();

    @property(Mines_WinPanel)
    private winPanel : Mines_WinPanel = null;

    static Instance : Mines_GameManager = null;

    onLoad(){
        Mines_GameManager.Instance = this;
        this.Init();
    }
    Init(){
        this.SetCurrentBetLevel(this.minBetLevel);
    }

    //Get Set

    public GetInitMoney(){
        return this.initMoney;
    }

    private CostNextTile(){
        return this.GetNextCost(this.itemIsOpenedAmount);
    }
    private CurrentCost(){
        return this.GetCurrentCost(this.itemIsOpenedAmount - 1);
    }
    
    private GetNextCost(mineIsOpenedAmount : number){
        var mineData = this.profitCostData.profitMineData[this.currentMineAmount];
        return mineData[mineIsOpenedAmount];
    }
    
    private GetCurrentCost(mineIsOpenedAmount : number){
        var mineData = this.profitCostData.profitMineData[this.currentMineAmount];
        return mineData[mineIsOpenedAmount];
    }
    
    public IsBetting(){
        return this.isBetting;
    }

    public CurrentBetLevel(){
        return this.currentBetLevel;
    }

    public CurrentMineAmount(){
        return this.currentMineAmount;
    }

    public MinMine(){
        return this.minMine;
    }
    public ItemIsOpenedAmount(){
        return this.itemIsOpenedAmount;
    }

    public SetItemIsOpenedAmount(value : number){
        this.itemIsOpenedAmount = value;
    }

    public GetAmountItemIsOpened(){
        
        this.itemIsOpenedAmount = 0;
        
        const itemGroup = Mines_PlayGroup.Instance.ItemGroup();
        
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(Mines_Item);
            if(itemComponent.IsOpened()) this.itemIsOpenedAmount++;
        }
    }

    public SetCurrentMoney(value: number){
        this.currentMoney += value;
        
        Mines_BetGroup.Instance.GetInfoGroup().SetCurrentMoneyLabel(this.currentMoney);

        Mines_DataManager.instance.SetMoneyData(this.currentMoney);
    }


    public SetGameState(isWin : boolean){
        if(!isWin){
            this.SetListItemEndGame();
        }
        else{
            this.SetCurrentMoney(this.totalProfit);
            this.SetWinPanelState(true);
        }
        this.ResetData();
    }

    public SetListItemEndGame(){
        const itemGroup = Mines_PlayGroup.Instance.ItemGroup();
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(Mines_Item);
            itemComponent.OnOpenItem();
    
        }
    }

    public MoneyEnough(){
        return this.currentMoney >= this.currentBetLevel;
    }
    public SetCurrentMineAmount(value : number){
        if(value < this.minMine || value > this.maxMine || this.isBetting) return;

        this.currentMineAmount = value;
        Mines_BetGroup.Instance.GetChooseMineGroup().CheckChooseMineGroup(this.currentMineAmount);
    }

    public SetBettingState(state : boolean){
        this.isBetting = state;
        Mines_BetGroup.Instance.BetButton().SetButtonSprite(this.isBetting);
        Mines_BetGroup.Instance.BetButtonState(true);

    }

    public SetCurrentBetLevel(value : number){
        if(this.isBetting) return;

        this.currentBetLevel = value;

        if(this.currentBetLevel < this.minBetLevel) this.currentBetLevel = this.minBetLevel;
        if(this.currentBetLevel > this.maxBetLevel) this.currentBetLevel = this.maxBetLevel;

        
        Mines_BetGroup.Instance.GetChooseBetGroup().SetBetLevelLabel(this.currentBetLevel);
    }
  
    public SetTotalProfit(value : number){

        this.totalProfit = value;
    }

    public SetProfitOnNextTile(){

        let costNextTile = this.GetNextCost(this.itemIsOpenedAmount);
        this.profitOnNextTile = costNextTile * this.currentBetLevel;
    }

    public SetWinPanelState(state : boolean){
        this.winPanel.node.active = state;
    
        if(state == true){
            this.winPanel.SetCostLabel(this.CurrentCost());
            this.winPanel.SetTotalProfitLabel(this.totalProfit);
        }
    }



    private ResetData(){
        this.totalProfit = 0;
        this.profitOnNextTile = 0;
        this.itemIsOpenedAmount = 0;

        this.SetBettingState(false);
    }


    public BetMoney(value : number){
        this.SetCurrentMoney(-value);
    }
}
