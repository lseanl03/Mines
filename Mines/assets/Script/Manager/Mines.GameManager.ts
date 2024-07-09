

import MinesBetGroup from "../GameplayUI/Mines.BetGroup";
import MinesItem from "../GameplayUI/Mine.Item";
import MinesPlayGroup from "../GameplayUI/Mines.PlayGroup";
import ProfitCostData from "../ProfitCostData";
import MinesWinPanel from "../UI/Mines.WinPanel";
import MinesDataManager from "./Mines.DataManager";
import MinesPopupUIManager from "./Mines.PopupUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesGameManager extends cc.Component {
 
    private isBetting : boolean = false;
    private minBetLevel : number = 5000;
    private maxBetLevel : number = 5000000;
    private minMine : number = 1;
    private maxMine : number = 15;
    private initMoney : number = 1000000;

    private currentCost : number = 0;
    private profitOnNextTile : number = 0;
    private currentBetLevel : number = 0; 
    private currentMoney : number = 0;
    private currentMineAmount : number = 0;
    private totalProfit : number = 0;
    private itemIsOpenedAmount : number = 0;

    private profitCostData : ProfitCostData = new ProfitCostData();

    @property(MinesWinPanel)
    private winPanel : MinesWinPanel = null;

    static Instance : MinesGameManager = null;

    onLoad(){
        MinesGameManager.Instance = this;
        this.Init();
    }
    Init(){
        this.SetCurrentBetLevel(this.minBetLevel);
    }

    //Get Set

    public GetInitMoney(){
        return this.initMoney;
    }

    public CostNextTile(){
        return this.GetNextCost(this.itemIsOpenedAmount);
    }
    private CurrentCost(){
        return this.GetCurrentCost(this.itemIsOpenedAmount - 1);
    }
    
    private GetNextCost(mineIsOpenedAmount : number){
        const mineData = this.profitCostData.profitMineData[this.currentMineAmount];
        return mineData[mineIsOpenedAmount];
    }
    
    private GetCurrentCost(mineIsOpenedAmount : number){
        const mineData = this.profitCostData.profitMineData[this.currentMineAmount];
        this.currentCost = mineData[mineIsOpenedAmount];
        return this.currentCost;
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
        
        const itemGroup = MinesPlayGroup.Instance.ItemGroup();
        
        for(let i = 0; i < itemGroup.childrenCount; i++){
            const item = itemGroup.children[i];
            const itemComponent = item.getComponent(MinesItem);
            if(itemComponent.IsOpened()) this.itemIsOpenedAmount++;
        }
    }

    public SetCurrentMoney(value: number){
        this.currentMoney += value;
        
        MinesBetGroup.Instance.GetInfoGroup().SetCurrentMoneyLabel(this.currentMoney);

        MinesDataManager.instance.SetMoneyData(this.currentMoney);
    }


    public SetGameState(isWin : boolean){
        if(!isWin){
            this.SetListItemEndGame();
        }
        else{
            this.SetCurrentMoney(this.totalProfit);
            this.SetWinPanelState(true);
        }

        this.HandleAfterEndGame();
    }

    public SetListItemEndGame(){
        const itemGroup = MinesPlayGroup.Instance.ItemGroup();
        for(let i = 0; i < itemGroup.childrenCount; i++){
            let item = itemGroup.children[i];
            let itemComponent = item.getComponent(MinesItem);
            itemComponent.OnOpenItem();
    
        }
    }

    public MoneyEnough(){
        return this.currentMoney >= this.currentBetLevel;
    }
    public SetCurrentMineAmount(value : number){
        if(value < this.minMine || value > this.maxMine || this.isBetting) return;

        this.currentMineAmount = value;
        MinesBetGroup.Instance.GetChooseMineGroup().CheckChooseMineGroup(this.currentMineAmount);
    }

    public SetBettingState(state : boolean){
        this.isBetting = state;
        MinesBetGroup.Instance.BetButton().SetButtonSprite(this.isBetting);
        MinesBetGroup.Instance.BetButtonState(true);

    }

    public SetCurrentBetLevel(value : number){
        if(this.isBetting) return;

        this.currentBetLevel = value;

        if(this.currentBetLevel < this.minBetLevel) this.currentBetLevel = this.minBetLevel;
        if(this.currentBetLevel > this.maxBetLevel) this.currentBetLevel = this.maxBetLevel;

        
        MinesBetGroup.Instance.GetChooseBetGroup().SetBetLevelLabel(this.currentBetLevel);
    }
  
    public SetTotalProfit(value : number){

        this.totalProfit = value;
    }

    public GetProfitOnNextTile(){

        const costNextTile = this.GetNextCost(this.itemIsOpenedAmount);
        this.profitOnNextTile = costNextTile * this.currentBetLevel;
        return this.profitOnNextTile;
    }

    public SetWinPanelState(state : boolean){
        this.winPanel.node.active = state;
    
        if(state){
            this.winPanel.SetCostLabel(this.CurrentCost());
            this.winPanel.SetTotalProfitLabel(this.GetTotalProfit());
            this.SetCurrentMoney(this.GetTotalProfit());
        }
    }

    private GetTotalProfit(){
        this.totalProfit = this.currentBetLevel * this.currentCost;
        return this.totalProfit;
    }



    private ResetData(){
        this.totalProfit = 0;
        this.profitOnNextTile = 0;
        this.itemIsOpenedAmount = 0;
        this.currentCost = 0;

        this.SetBettingState(false);
    }


    public BetMoney(value : number){
        this.SetCurrentMoney(-value);
    }

    public HandleAfterEndGame(){

        const popupUIManager = MinesPopupUIManager.Instance;

        popupUIManager.GetHistoryBetPopup().SpawnHistoryBet(this.currentCost, this.currentBetLevel);
        popupUIManager.GetTopBetPopup().SpawnTopBet(this.totalProfit);

        MinesPlayGroup.Instance.HandleResetRound();

        this.ResetData();
    }
}
