import URI_T = uri.URI;
import * as URI from "urijs";

export class TypicodeURL {
    // http://stackoverflow.com/a/33914211 add a get only accessor
    public static get ofPosts(): URI_T {
        // http://stackoverflow.com/a/13408029 Construct signatures in interfaces are not implementable in classes; they're
        // only for defining existing JS APIs that define a 'new'-able function.
        return new URI(TypicodeURL.Constants.POSTURL);
    };
}

// http://stackoverflow.com/a/39176871
export namespace TypicodeURL.Constants {
    export const BASEURL: string = 'http://jsonplaceholder.typicode.com';
    export const POSTURL: string = BASEURL + '/posts';
}