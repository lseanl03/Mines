// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesBetGroup from "../GameplayUI/Mines.BetGroup";
import MinesConfig from "../Mines.Config";
import MinesGameManager from "./Mines.GameManager";
import MinesPopupUIManager from "./Mines.PopupUIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesDataManager extends cc.Component {

    static instance: MinesDataManager = null;

    private nickName : string = 'null'; 

    private nicknameKey : string = 'Mines_nickname';
    private moneyKey : string = 'Mines_money';

    //host : string = "https://apigame.agaming.studio/v1/csa/"; 

    protected onLoad(): void {
        MinesDataManager.instance = this;

        this.Init();
    }


    private Init(){
        this.RemoveLocalData(this.nicknameKey);
        this.RemoveLocalData(this.moneyKey);
    }


    private SaveLocalData(key: string, value: any) {
        cc.sys.localStorage.setItem(key, JSON.stringify(value));
    }

    private LoadLocalData(key: string): any {
        const data = cc.sys.localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    RemoveLocalData(key: string) {
        cc.sys.localStorage.removeItem(key);
    }

    public SetUserNameData(userName : string){

        const popupUIManager = MinesPopupUIManager.Instance;

        this.nickName = userName;

        this.SaveLocalData(this.nicknameKey, this.nickName);

        popupUIManager.GetUserNamePopup().ShowCompletePopup();
        popupUIManager.GetUserNamePopup().SetUserNameViewLabel(this.nickName);

        MinesBetGroup.Instance.GetInfoGroup().SetUserNameLabel(this.nickName);
    }

    public GetUserNameData(){
        let nicknameLocal = this.LoadLocalData(this.nicknameKey);

        cc.log("Get Mines_nickname " + nicknameLocal);


        if(nicknameLocal){
            this.nickName = nicknameLocal;
            MinesBetGroup.Instance.GetInfoGroup().SetUserNameLabel(this.nickName);
        }
        else MinesPopupUIManager.Instance.ShowUserNamePopup();
    }




    public SetMoneyData(money : number){
        this.SaveLocalData(this.moneyKey, money);
    }

    public GetMoneyData(){
        const money = this.LoadLocalData(this.moneyKey);
        const gameManager = MinesGameManager.Instance;

        gameManager.SetCurrentMoney(money ?? MinesConfig.initMoney);

        cc.log("money " + money);
    }

    public GetNickName(){
        return this.nickName;
    }
}
