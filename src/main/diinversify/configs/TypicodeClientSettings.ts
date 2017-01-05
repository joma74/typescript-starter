import {injectable, inject, optional} from "inversify";
import * as URI from "urijs";
import {EnvEnum} from "main/diinversify/configs/EnvEnum";
import {ITypicodeClientSettings} from "./ITypicodeClientSettings";

@injectable()
export default class TypicodeClientSettings implements ITypicodeClientSettings {

    private configs: any;

    public constructor(@inject("EnvEnum") @optional() env: EnvEnum) {
        const envName = EnvEnum.asName(env);
        this.configs = require(`main/diinversify/configs/configuration.${envName}`).default();
    }

    ofBaseURL(): uri.URI {
        return new URI(this.configs.typicodeClient.baseURL).normalize();
    }

    ofPostsURL(): uri.URI {
        let baseURL = this.ofBaseURL().clone();
        let postsURL = baseURL.segment(this.configs.typicodeClient.postsPath).normalize();
        return postsURL;
    }

}