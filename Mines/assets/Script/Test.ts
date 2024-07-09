// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    private sprite: cc.Sprite = null;

    protected onLoad(): void {
        cc.assetManager.loadBundle('AssetBundle', (err, bundle) => {
            if (err) {
                console.error('Load Asset Bundle failed:', err);
                return;
            }

            bundle.load(`Image/coin.png`, cc.SpriteFrame, function (err, spriteFrame) {
                console.log(spriteFrame);
            });
        });
    }
}
