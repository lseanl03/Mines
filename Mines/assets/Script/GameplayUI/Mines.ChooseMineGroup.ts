// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesGameManager from "../Manager/Mines.GameManager";
import MinesChooseMine from "./Mines.ChooseMine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesChooseMineGroup extends cc.Component {

    @property(cc.Button)
    private subButton : cc.Button = null;

    @property(cc.Button)
    private sumButton : cc.Button = null;
    
    @property(cc.Label)
    private chooseMineViewLabel : cc.Label = null;

    @property(MinesChooseMine)
    private chooseMineList : MinesChooseMine[] = [];

    protected onLoad(): void {
        this.AddListener();
    }

    protected start(): void {
        this.Init();
    }

    Init(){
        this.SetChooseMineViewLabel(MinesGameManager.Instance.CurrentMineAmount());
    }

    AddListener(){
        this.subButton.node.on('click', this.OnSubButtonClick, this);
        this.sumButton.node.on('click', this.OnSumButtonClick, this);
    }

    private OnSubButtonClick(){
        const gameManager = MinesGameManager.Instance;

        gameManager.SetCurrentMineAmount(gameManager.CurrentMineAmount() - 1);
        this.SetChooseMineViewLabel(gameManager.CurrentMineAmount());
    }

    private OnSumButtonClick(){
        const gameManager = MinesGameManager.Instance;

        gameManager.SetCurrentMineAmount(gameManager.CurrentMineAmount() + 1);
        this.SetChooseMineViewLabel(gameManager.CurrentMineAmount());
    }

    public SetChooseMineViewLabel(value : number){
        this.chooseMineViewLabel.string = value.toString();
    }

    public SetButtonState(state : boolean){
        this.subButton.interactable = this.sumButton.interactable = state;
    }

    public CheckChooseMineGroup(value){
        for(let i = 0; i < this.chooseMineList.length; i++){
            this.chooseMineList[i].SetMineBorderSpriteState(this.chooseMineList[i].mineAmount == value ? true : false);
        }
    }
}
