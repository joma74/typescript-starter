export interface ITypicodeClientSettings {
    ofBaseURL(): uri.URI;
    ofPostsURL(): uri.URI;
}

export namespace ITypicodeClientSettings.TYPE {
    export const NAME: string = "ITypicodeClientSettings";
}