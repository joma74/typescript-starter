import {inject, injectable} from "inversify";
import {IWeapon} from "main/diinversify/basic/intfcs/IWeapon";
import {IWarrior} from "main/diinversify/basic/intfcs/IWarrior";
import {IThrowableWeapon} from "main/diinversify/basic/intfcs/IThrowableWeapon";

@injectable()
export default class Ninja implements IWarrior {

    private _katana: IWeapon;
    private _shiuriken: IThrowableWeapon;

    public constructor(@inject(IWeapon.TYPE.NAME) katana: IWeapon,
                       @inject(IThrowableWeapon.TYPE.NAME) shuriken: IThrowableWeapon) {
        this._katana = katana;
        this._shiuriken = shuriken;
    }

    fight(): string {
        return this._katana.hit();
    }

    sneak(): string {
        return this._shiuriken.throw();
    }

}