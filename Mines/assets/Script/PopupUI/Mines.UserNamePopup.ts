// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesDataManager from "../Manager/Mines.DataManager";
import MinesConfig from "../Mines.Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesUserNamePopup extends cc.Component {

    @property(cc.Node)
    private createPopup : cc.Node = null;

    @property(cc.Node)
    private createPanel : cc.Node = null;

    @property(cc.Button)
    private continueButton : cc.Button = null;



    @property(cc.Node)
    private completePopup : cc.Node = null;

    @property(cc.Node)
    private completePanel : cc.Node = null;

    @property(cc.Button)
    private completeButton : cc.Button = null;



    @property(cc.Node)
    private failPopup : cc.Node = null;

    @property(cc.Node)
    private failPanel : cc.Node = null;

    @property(cc.Button)
    private retryButton : cc.Button = null;


    @property(cc.Label)
    private userNameViewLabel : cc.Label = null;

    @property(cc.EditBox)
    private usernameEditBox : cc.EditBox = null;

    @property(cc.Label)
    private infoLabel : cc.Label = null;

    protected onLoad(): void {
        this.continueButton.node.on('click', this.OnContinueButtonClick, this);
        this.completeButton.node.on('click', this.OnCompleteButtonClick, this);
        this.retryButton.node.on('click', this.OnRetryButtonClick, this);

    }

    protected start(): void {
        this.Init();
    }

    private Init(){
        this.usernameEditBox.maxLength = MinesConfig.maxBetLevel;
    }

    private OnContinueButtonClick(){
        if(this.TextValid()){
            MinesDataManager.instance.SetUserNameData(this.UsernameEntering());
        }

        else this.InfoEffect();
    }

    private OnCompleteButtonClick(){
        this.HidePopUp(this.completePopup, this.completePanel);
        this.HidePopUp(this.createPopup, this.createPanel);
    }

    private OnRetryButtonClick(){

    }

    private TextValid(){
        const text = this.usernameEditBox.string.trim(); 
        
        if (text.length >= MinesConfig.minMine && text.length <= MinesConfig.maxMine) {
            return true;
        } 
        return false;
    }

    private InfoEffect(){
        this.infoLabel.node.scale = 1;
        this.continueButton.interactable = false;
        cc.tween(this.infoLabel.node)
        .to(0.1, { scale: 1.1 })
        .to(0.1, { scale: 1 })
        .call(() => {
            this.continueButton.interactable = true;
        })
        .start();
    }

    public SetUserNameViewLabel(nickName : string){
        this.userNameViewLabel.string = nickName;
    }

    private UsernameEntering(){
        return this.usernameEditBox.string.trim();
    }   

    public ShowCompletePopup(){
        this.ShowPopUp(this.completePopup, this.completePanel);
    }

    public ShowCreatePopup(){
        this.ShowPopUp(this.createPopup, this.createPanel);
    }

    ShowPopUp(popup : cc.Node, panel : cc.Node){
        popup.active = true;
        panel.active = true;

        panel.opacity = 0;
        panel.position = cc.v3(0,300,0);


        cc.tween(panel)
        .to(0.5, {opacity: 255, position: cc.v3(0,0,0)}, { easing: 'backOut'})
        .call(() => {
        })
        .start();
    }
    HidePopUp(popup : cc.Node, panel : cc.Node){
        
        panel.opacity = 255;
        panel.position = cc.v3(0,0,0);
        
        cc.tween(panel)
        .to(0.5, {opacity: 0, position: cc.v3(0,300,0)}, { easing: 'backIn'})
        .call(() => {
            popup.active = false;
            panel.active = false;    
        })
        .start();
    }
}
