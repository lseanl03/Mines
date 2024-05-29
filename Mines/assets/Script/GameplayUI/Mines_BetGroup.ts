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

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_BetGroup extends cc.Component {

    static Instance : Mines_BetGroup = null;
    
    @property(cc.Button)
    private defaultModeButton : cc.Button = null;

    @property(cc.Button)
    private autoPlayModeButton : cc.Button = null;

    @property(cc.Button)
    private subButton : cc.Button = null;

    @property(cc.Button)
    private sumButton : cc.Button = null;
    
    @property(cc.Label)
    private chooseMineViewLabel : cc.Label = null;

    @property(Mines_BetButton)
    private betButton : Mines_BetButton = null;

    @property(cc.Label)
    private chooseBetLevelLabel : cc.Label = null;

    @property(cc.Node)
    private chooseMineGroup : cc.Node = null;

    private chooseMine : ChooseMine[] = [];
    
    protected onLoad(): void {
        Mines_BetGroup.Instance = this;
        this.AddListener();
    }
    protected start(): void {
        this.Init();
    }

    private Init(){
        Mines_GameManager.Instance.SetCurrentMineAmount(Mines_GameManager.Instance.MinMine());
        
        this.SetChooseMineViewLabel(Mines_GameManager.Instance.CurrentMineAmount());
        this.GetChooseMine();

    }

    AddListener(){
        this.betButton.node.on('click', this.OnBetButtonClick, this);
        this.subButton.node.on('click', this.OnSubButtonClick, this);
        this.sumButton.node.on('click', this.OnSumButtonClick, this);


    }

    //Get Set

    private GetChooseMine(){
        for(let i = 0; i < this.chooseMineGroup.childrenCount; i++){
            let chooseMine = this.chooseMineGroup.children[i].getComponent(ChooseMine);
            this.chooseMine.push(chooseMine);
        }
    }

    public BetButton(){
        return this.betButton;
    }

    
    public SetBetLevel(value : number){
        Mines_GameManager.Instance.SetCurrentBetLevel(value);
    }

    public SetChooseMineViewLabel(value : number){
        this.chooseMineViewLabel.string = value.toString();
    }

    public SetBetLevelLabel(betLevel : number){

        if (betLevel >= 1000000) {
            this.chooseBetLevelLabel.string = (betLevel/1000000) + "M";
        } else if (betLevel >= 1000) {
            this.chooseBetLevelLabel.string = (betLevel/1000) + "K";
        } else {
            this.chooseBetLevelLabel.string = "" + betLevel;
        }
    }

    public BetButtonState(state : boolean){
        this.subButton.interactable = state;
        this.sumButton.interactable = state;
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

private GetAmountItemIsOpened(): void {

    Mines_GameManager.Instance.SetItemIsOpenedAmount(0);
    
    const itemGroup = Mines_PlayGroup.Instance.ItemGroup();
    
    for (let i = 0; i < itemGroup.childrenCount; i++) {
        let item = itemGroup.children[i];
        let itemComponent = item.getComponent(Mines_Item);
        if (itemComponent.IsOpened()) {
            Mines_GameManager.Instance.SetItemIsOpenedAmount(Mines_GameManager.Instance.ItemIsOpenedAmount() + 1);
        }
    }

    if (Mines_GameManager.Instance.IsBetting()) {
        Mines_GameManager.Instance.SetTotalProfit(Mines_GameManager.Instance.ItemIsOpenedAmount());
    } else {
        Mines_GameManager.Instance.SetTotalProfit(Mines_GameManager.Instance.CurrentBetLevel());
    }
    Mines_GameManager.Instance.SetProfitOnNextTile();
}



    private OnBetButtonClick(){
        if(!Mines_GameManager.Instance.MoneyEnough()) return;

        if(Mines_GameManager.Instance.IsBetting() && Mines_GameManager.Instance.ItemIsOpenedAmount() > 0){
            cc.log("HandleCashOutOnClick");
            this.HandleStopOnClick();
            return;
        }

        if(Mines_GameManager.Instance.IsBetting()) return;

        cc.log("HandleBetOnClick");
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
        cc.log("Done");
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


    private OnSubButtonClick(){
        Mines_GameManager.Instance.SetCurrentMineAmount(Mines_GameManager.Instance.CurrentMineAmount() - 1);
        this.SetChooseMineViewLabel(Mines_GameManager.Instance.CurrentMineAmount());
    }

    private OnSumButtonClick(){
        Mines_GameManager.Instance.SetCurrentMineAmount(Mines_GameManager.Instance.CurrentMineAmount() + 1);
        this.SetChooseMineViewLabel(Mines_GameManager.Instance.CurrentMineAmount());
    }

    public CheckChooseMineGroup(value){
        for(let i = 0; i < this.chooseMine.length; i++){
            if(this.chooseMine[i].mineAmount == value){
                this.chooseMine[i].SetMineBorderSpriteState(true);
            }
            else{
                this.chooseMine[i].SetMineBorderSpriteState(false);
            }
        }
    }


}
