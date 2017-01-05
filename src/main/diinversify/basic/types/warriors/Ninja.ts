import {inject, injectable} from "inversify";
import {BASIC_TYPES} from "../../intfcs/BasicTypes";

@injectable()
export default class Ninja implements IWarrior {

    private _katana: IWeapon;
    private _shiuriken: IThrowableWeapon;

    public constructor(@inject(BASIC_TYPES.IWeapon) katana: IWeapon,
                       @inject(BASIC_TYPES.IThrowableWeapon) shuriken: IThrowableWeapon) {
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