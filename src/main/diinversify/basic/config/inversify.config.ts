import {Container} from "inversify";
import {BASIC_TYPES} from "main/diinversify/basic/intfcs/BasicTypes";
import "reflect-metadata"; // this import must occur BEFORE any types
import Ninja from "main/diinversify/basic/types/warriors/Ninja";
import Katana from "main/diinversify/basic/types/weapons/Katana";
import Shuriken from "main/diinversify/basic/types/weapons/Shuriken";

var myContainer = new Container();
myContainer.bind<IWarrior>(BASIC_TYPES.IWarrior).to(Ninja);
myContainer.bind<IWeapon>(BASIC_TYPES.IWeapon).to(Katana);
myContainer.bind<IThrowableWeapon>(BASIC_TYPES.IThrowableWeapon).to(Shuriken);

export {myContainer};
