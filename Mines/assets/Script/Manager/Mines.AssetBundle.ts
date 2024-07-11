// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesPlayGroup from "../GameplayUI/Mines.PlayGroup";
import MinesConfig from "../Mines.Config";
import MinesAudioManager from "./Mines.AudioManager";
import MinesDataManager from "./Mines.DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesAssetBundle extends cc.Component {
    

    public bundle: cc.AssetManager.Bundle = null;

    public static Instance : MinesAssetBundle = null;

    protected onLoad(): void {
        MinesAssetBundle.Instance = this;

        cc.assetManager.loadBundle(MinesConfig.bundleName, (err, bundle) => {
            if (err) {
                console.error('Load Asset Bundle failed:', err);
                return;
            }
            this.bundle = bundle;

            this.Init();

        });
    }

    private Init(){
        const dataManager = MinesDataManager.instance;
        const audioManager = MinesAudioManager.Instance;


        this.SpawnItemInit();
        dataManager.GetUserNameData();
        dataManager.GetMoneyData();
        audioManager.PlayTheme('Audio/Theme');
    }

    public SpawnItemInit(){
        this.bundle.load('Prefab/Item', cc.Prefab, (error, itemPrefab: cc.Prefab) => {
            if (error) {
                console.error('Load Prefab failed:', error);
                return;
            }

            for (let i = 0; i < 25; i++) {
                const item = cc.instantiate(itemPrefab); 
                item.parent = MinesPlayGroup.Instance.ItemGroup();
                
            }
        });
    }
}
