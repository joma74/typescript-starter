import {injectable} from "inversify";

@injectable()
export default class Katana implements IWeapon {
    public hit() {
        return "cut!";
    }
}