import "reflect-metadata"; // this import must occur BEFORE any types
import {EnvEnum} from "main/diinversify/configs/EnvEnum";
import {Container} from "inversify";
import * as ITracer from "inversify-tracer";
import * as Bunayan from "bunyan";
import * as configProd from "main/diinversify/configs/configuration.prod";
import * as configDev from "main/diinversify/configs/configuration.dev";
import * as configMock from "main/diinversify/configs/configuration.mock";
import TypicodeClientSettings from "main/diinversify/configs/TypicodeClientSettings";
import {ITypicodeClientSettings} from "main/diinversify/configs/ITypicodeClientSettings";
var assert = require('assert');
import winston = require("winston"); // to make winston.level = "info" not throw TS2450; See https://github.com/Microsoft/TypeScript/issues/6751

describe('DIInversify#configs', function () {
    // winston.level = "debug"; // "info" is the default
    describe('#EnvEnum behavior', function () {
        it('#1 asName given PROD then PROD', function () {
            let name = EnvEnum.asName(EnvEnum.PROD);
            assert.equal(name, EnvEnum.PROD_ASNAME);
        });
        it('#2 asName given DEV then DEV', function () {
            let name = EnvEnum.asName(EnvEnum.DEV)
            assert.equal(name, EnvEnum.DEV_ASNAME);
        });
        it('#3 asName given undefined then PROD', function () {
            let name = EnvEnum.asName(undefined)
            assert.equal(name, EnvEnum.PROD_ASNAME);
        });
        it('#4 asName given null then PROD', function () {
            let name = EnvEnum.asName(null);
            assert.equal(name, EnvEnum.PROD_ASNAME);
        });
    });
    describe('#settings', function () {
        it('#1 when EnvEnum.PROD then PROD settings', function () {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(EnvEnum.PROD);
            const itracer = new ITracer.InversifyTracer();
            itracer.on('call', (callInfo: ITracer.CallInfo) => {
                const parametersWithValue = callInfo.parameters.map((param: any, i: number) => `${param}:${callInfo.arguments[i]}`);
                winston.debug(`${callInfo.className} ${callInfo.methodName} called ${parametersWithValue}`);
            });
            itracer.on('return', (returnInfo: ITracer.ReturnInfo) => {
                winston.debug(`${returnInfo.className} ${returnInfo.methodName} returned ${returnInfo.result}`);
            });
            itracer.apply(container);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configProd.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPostsURL().path().toString(), configProd.default().typicodeClient.postsPath);
        });
        it('#2 when EnvEnum.DEV then DEV settings', function () {
            let test = this.test.fullTitle();
            let logger = Bunayan.createLogger({
                name: 'DIInversify#configs',
                src: true,
                level: 'debug',
                streams: [{path: `lib/test/test.output.log`}]
            });
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(EnvEnum.DEV);
            const itracer = new ITracer.InversifyTracer();
            itracer.on('call', (callInfo: ITracer.CallInfo) => {
                const parametersWithValue = callInfo.parameters.map((param: any, i: number) => `${param}:${callInfo.arguments[i]}`);
                logger.debug({test: test}, `${callInfo.className} ${callInfo.methodName} called ${parametersWithValue}`);
            });
            itracer.on('return', (returnInfo: ITracer.ReturnInfo) => {
                logger.debug({test: test}, `${returnInfo.className} ${returnInfo.methodName} returned ${returnInfo.result}`);
            });
            itracer.apply(container);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configDev.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPostsURL().path().toString(), configDev.default().typicodeClient.postsPath);
        });
        it('#3 when undefined then PROD settings', function () {
            let container = new Container();
            container.bind<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME).to(TypicodeClientSettings);
            container.bind<EnvEnum>(EnvEnum.TYPE.NAME).toConstantValue(undefined);
            let clientSettings = container.get<ITypicodeClientSettings>(ITypicodeClientSettings.TYPE.NAME);
            assert.equal(clientSettings.ofBaseURL().toString(), configProd.default().typicodeClient.baseURL);
            assert.equal(clientSettings.ofPostsURL().path().toString(), configProd.default().typicodeClient.postsPath);
        });
        it('#4 when EnvEnum.MOCK then MOCK settings', function () {
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