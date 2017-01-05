import {injectable} from "inversify";
import {IThrowableWeapon} from "main/diinversify/basic/intfcs/IThrowableWeapon";

@injectable()
export default class Shuriken implements IThrowableWeapon {
    public throw(): string {
        return "hit!";
    }

}