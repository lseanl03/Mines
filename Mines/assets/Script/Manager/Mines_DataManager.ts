// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Mines_BetGroup from "../GameplayUI/Mines_BetGroup";
import Mines_GameManager from "./Mines_GameManager";
import Mines_PopupUIManager from "./Mines_PopupUIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Mines_DataManager extends cc.Component {

    static instance: Mines_DataManager = null;

    private nickName : string = 'null'; 

    private nicknameKey : string = 'Mines_nickname';
    private moneyKey : string = 'Mines_money';

    //host : string = "https://apigame.agaming.studio/v1/csa/"; 

    protected onLoad(): void {
        Mines_DataManager.instance = this;

        this.Init();

    }

    private Init(){
        // this.RemoveLocalData(this.nicknameKey);
        // this.RemoveLocalData(this.moneyKey);

        this.GetUserNameData();
        this.GetMoneyData();
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

        this.nickName = userName;

        this.SaveLocalData(this.nicknameKey, this.nickName);

        Mines_PopupUIManager.Instance.GetUserNamePopup().ShowCompletePopup();
        Mines_PopupUIManager.Instance.GetUserNamePopup().SetUserNameViewLabel(this.nickName);

        Mines_BetGroup.Instance.GetInfoGroup().SetUserNameLabel(this.nickName);
    }

    private GetUserNameData(){
        let nicknameLocal = this.LoadLocalData(this.nicknameKey);

        cc.log("Get Mines_nickname " + nicknameLocal);


        if(nicknameLocal != null){
            this.nickName = nicknameLocal;
            Mines_BetGroup.Instance.GetInfoGroup().SetUserNameLabel(this.nickName);
        }
        else
        {
            Mines_PopupUIManager.Instance.GetUserNamePopup().ShowCreatePopup();
        }
    }




    public SetMoneyData(money : number){
        this.SaveLocalData(this.moneyKey, money);
    }

    private GetMoneyData(){
        let money = this.LoadLocalData(this.moneyKey);

        cc.log("money " + money);

        if(money != null) Mines_GameManager.Instance.SetCurrentMoney(money);
        else Mines_GameManager.Instance.SetCurrentMoney(Mines_GameManager.Instance.GetInitMoney());
    }

}
