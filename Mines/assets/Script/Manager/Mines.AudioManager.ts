// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import MinesAssetBundle from "./Mines.AssetBundle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesAudioManager extends cc.Component {

    public static Instance : MinesAudioManager = null;

    protected onLoad(): void {
        MinesAudioManager.Instance = this;
    }

    public PlaySFX(path : string){
        MinesAssetBundle.Instance.bundle.load(path, cc.AudioClip, (err, audioClip) => {
            if (err) {
                console.error('Failed to load theme audio:', err);
                return;
            }

            cc.audioEngine.playEffect(audioClip, false);
        });
    }

    public PlayTheme(path : string){
        MinesAssetBundle.Instance.bundle.load(path, cc.AudioClip, (err, audioClip) => {
            if (err) {
                console.error('Failed to load theme audio:', err);
                return;
            }

            cc.audioEngine.playMusic(audioClip, true);
        });
    }
}
