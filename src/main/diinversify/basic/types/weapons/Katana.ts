import {injectable} from "inversify";
import {IWeapon} from "main/diinversify/basic/intfcs/IWeapon";

@injectable()
export default class Katana implements IWeapon {
    public hit() {
        return "cut!";
    }
}