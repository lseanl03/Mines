
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    private sprite: cc.Sprite = null;

    protected onLoad(): void {
        cc.assetManager.loadBundle('MainBundle', (err, bundle) => {
            if (err) {
                console.error('Load Asset Bundle failed:', err);
                return;
            }

            bundle.load('Image/coin', cc.SpriteFrame, (error, spriteFrame: cc.SpriteFrame) => {
                if (error) {
                    console.error('Load Image failed:', error);
                    return;
                }

                this.sprite.spriteFrame = spriteFrame;
            });
        });
    }
}
