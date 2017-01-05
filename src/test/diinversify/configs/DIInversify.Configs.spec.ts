import "reflect-metadata"; // this import must occur BEFORE any types
import {EnvEnum} from "main/diinversify/configs/EnvEnum";
import {Container} from "inversify";
import * as configProd from "main/diinversify/configs/configuration.prod";
import * as configDev from "main/diinversify/configs/configuration.dev";
import * as configMock from "main/diinversify/configs/configuration.mock";
import TypicodeClientSettings from "main/diinversify/configs/TypicodeClientSettings";
import {ITypicodeClientSettings} from "main/diinversify/configs/ITypicodeClientSettings";
var assert = require('assert')
    ;

describe('DIInversify#configs', () => {
    describe('#EnvEnum behavior', () => {
        it('#1 asName given PROD then PROD', () => {
            let name = EnvEnum.asName(EnvEnum.PROD);
            assert.equal(name, EnvEnum.PROD_ASNAME);
        });
        it('#2 asName given DEV then DEV', () => {
            let name = EnvEnum.asName(EnvEnum.DEV)
            assert.equal(name, EnvEnum.DEV_ASNAME);
        });
        it('#3 asName given undefined then PROD', () => {
            let name = EnvEnum.asName(undefined)
            assert.equal(name, EnvEnum.PROD_ASNAME);
        });
        it('#4 asName given null then PROD', () => {
            let name = EnvEnum.asName(null);
            assert.equal(name, EnvEnum.PROD_ASNAME);
        });
    });
    describe('#settings', () => {
        it('#1 when EnvEnum.PROD then PROD settings', () => {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(EnvEnum.PROD);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configProd.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPostsURL().path().toString(), configProd.default().typicodeClient.postsPath);
        });
        it('#2 when EnvEnum.DEV then DEV settings', () => {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(EnvEnum.DEV);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configDev.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPostsURL().path().toString(), configDev.default().typicodeClient.postsPath);
        });
       it('#3 when undefined then PROD settings', () => {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(undefined);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configProd.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPostsURL().path().toString(), configProd.default().typicodeClient.postsPath);
        });
        it('#4 when EnvEnum.MOCK then MOCK settings', () => {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(EnvEnum.MOCK);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configMock.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPostsURL().path().toString(), configMock.default().typicodeClient.postsPath);
        });
    });
})
;