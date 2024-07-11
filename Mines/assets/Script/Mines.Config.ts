// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MinesConfig{
    public static minBetLevel : number = 5000;
    public static maxBetLevel : number = 5000000;
    public static minMine : number = 1;
    public static maxMine : number = 24;
    public static initMoney : number = 1000000;
    public static maxItem : number = 25;
    public static maxRow : number = 7;
    public static minUserNameLength : number = 3;
    public static maxUserNameLength : number = 17;

    public static bundleName : string = 'MainBundle';

}