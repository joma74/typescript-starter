export interface ITypicodeClientSettings {
    ofBaseURL(): uri.URI;
    ofPosts(): uri.URI;
}

export namespace ITypicodeClientSettings.TYPE {
    export const NAME: string = "ITypicodeClientSettings";
}