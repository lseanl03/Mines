// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_GameManager from "../Manager/Mines_GameManager";
import Mines_ChooseMine from "./Mines_ChooseMine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_ChooseMineGroup extends cc.Component {

    @property(cc.Button)
    private subButton : cc.Button = null;

    @property(cc.Button)
    private sumButton : cc.Button = null;
    
    @property(cc.Label)
    private chooseMineViewLabel : cc.Label = null;

    @property(Mines_ChooseMine)
    private chooseMineList : Mines_ChooseMine[] = [];

    protected onLoad(): void {
        this.AddListener();
    }

    protected start(): void {
        this.Init();
    }

    Init(){
        this.SetChooseMineViewLabel(Mines_GameManager.Instance.CurrentMineAmount());
    }

    AddListener(){
        this.subButton.node.on('click', this.OnSubButtonClick, this);
        this.sumButton.node.on('click', this.OnSumButtonClick, this);
    }

    private OnSubButtonClick(){
        Mines_GameManager.Instance.SetCurrentMineAmount(Mines_GameManager.Instance.CurrentMineAmount() - 1);
        this.SetChooseMineViewLabel(Mines_GameManager.Instance.CurrentMineAmount());
    }

    private OnSumButtonClick(){
        Mines_GameManager.Instance.SetCurrentMineAmount(Mines_GameManager.Instance.CurrentMineAmount() + 1);
        this.SetChooseMineViewLabel(Mines_GameManager.Instance.CurrentMineAmount());
    }

    public SetChooseMineViewLabel(value : number){
        this.chooseMineViewLabel.string = value.toString();
    }

    public SetButtonState(state : boolean){
        this.sumButton.interactable = state;
        this.subButton.interactable = state;
    }

    public CheckChooseMineGroup(value){
        for(let i = 0; i < this.chooseMineList.length; i++){
            if(this.chooseMineList[i].mineAmount == value){
                this.chooseMineList[i].SetMineBorderSpriteState(true);
            }
            else{
                this.chooseMineList[i].SetMineBorderSpriteState(false);
            }
        }
    }
}
