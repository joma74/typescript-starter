import "reflect-metadata"; // this import must occur BEFORE any types
import {Container} from "inversify";
import Ninja from "main/diinversify/basic/types/warriors/Ninja";
import Katana from "main/diinversify/basic/types/weapons/Katana";
import Shuriken from "main/diinversify/basic/types/weapons/Shuriken";
import {IWarrior} from "main/diinversify/basic/intfcs/IWarrior";
import {IWeapon} from "main/diinversify/basic/intfcs/IWeapon";
import {IThrowableWeapon} from "main/diinversify/basic/intfcs/IThrowableWeapon";

var myContainer = new Container();
myContainer.bind<IWarrior>(IWarrior.TYPE.NAME).to(Ninja);
myContainer.bind<IWeapon>(IWeapon.TYPE.NAME).to(Katana);
myContainer.bind<IThrowableWeapon>(IThrowableWeapon.TYPE.NAME).to(Shuriken);

export {myContainer};
