import {injectable} from "inversify";

@injectable()
export default class Shuriken implements IThrowableWeapon {
    public throw(): string {
        return "hit!";
    }

}