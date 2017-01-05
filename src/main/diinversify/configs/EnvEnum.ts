export enum EnvEnum {
    DEV,
    MOCK,
    PROD
}
export namespace EnvEnum.TYPE {
    export const NAME: string = "EnvEnum";
}
export namespace EnvEnum {
    export const DEV_ASNAME: string = "dev";
    export const MOCK_ASNAME: string = "mock";
    export const PROD_ASNAME: string = "prod";

    export function asName(env: EnvEnum): string {
        switch (env) {
            case EnvEnum.DEV:
                return DEV_ASNAME;
            case EnvEnum.MOCK:
                return MOCK_ASNAME;
            case EnvEnum.PROD:
            default:
                return PROD_ASNAME;
        }
    }
}