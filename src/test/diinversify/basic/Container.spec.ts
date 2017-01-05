import {myContainer} from "main/diinversify/basic/config/inversify.config";
import {BASIC_TYPES} from "main/diinversify/basic/intfcs/BasicTypes";
import {EnvEnum} from "main/diinversify/configs/EnvEnum";
import {Container} from "inversify";
import * as configProd from "main/diinversify/configs/configuration.prod";
import * as configDev from "main/diinversify/configs/configuration.dev";
import * as configMock from "main/diinversify/configs/configuration.mock";
import TypicodeClientSettings from "main/diinversify/configs/TypicodeClientSettings";
import {ITypicodeClientSettings} from "main/diinversify/configs/ITypicodeClientSettings";
var assert = require('assert')
    ;

describe('DIIInversify', () => {
    describe('#basics', () => {
        it('#1 test as in online basic example', () => {
            // see https://github.com/inversify/InversifyJS
            let ninja = myContainer.get<IWarrior>(BASIC_TYPES.IWarrior);
            assert.equal(ninja.fight(), "cut!");
            assert.equal(ninja.sneak(), "hit!");
        });
    });
    describe('#config settings', () => {
        it('#1 test EnvEnum values', () => {
            let name = EnvEnum.asName(EnvEnum.PROD);
            assert.equal(name, EnvEnum.PROD_ASNAME);
            name = EnvEnum.asName(EnvEnum.DEV)
            assert.equal(name, EnvEnum.DEV_ASNAME);
            name = EnvEnum.asName(undefined)
            assert.equal(name, EnvEnum.PROD_ASNAME);
            name = EnvEnum.asName(null);
            assert.equal(name, EnvEnum.PROD_ASNAME);
        });
        it('#2 test prod settings', () => {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(EnvEnum.PROD);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configProd.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPosts().path().toString(), configProd.default().typicodeClient.postsPath);
        });
        it('#3 test dev settings', () => {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(EnvEnum.DEV);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configDev.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPosts().path().toString(), configDev.default().typicodeClient.postsPath);
        });
        it('#4 test undefined settings same as prod', () => {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(undefined);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configProd.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPosts().path().toString(), configProd.default().typicodeClient.postsPath);
        });
        it('#5 test mock settings', () => {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(EnvEnum.MOCK);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configMock.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPosts().path().toString(), configMock.default().typicodeClient.postsPath);
        });
    });
})
;