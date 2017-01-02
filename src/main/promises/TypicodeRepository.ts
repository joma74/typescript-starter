import fetch, {Response} from "node-fetch";
import * as URI from "urijs";
// module <code>urijs</code> uses namespaces. <code>uri.URIStatic</code> is just the interface type prescribing new()
// and static methods
import URI_T = uri.URI;

export default class TypicodeRepository {
    // http://stackoverflow.com/a/13408029 Construct signatures in interfaces are not implementable in classes; they're
    // only for defining existing JS APIs that define a 'new'-able function.
    public static POSTS_URL: URI_T = new URI('http://jsonplaceholder.typicode.com/posts/');

    static fetchPost(id: number): Promise<Response> {
        // http://medialize.github.io/URI.js/docs.html#accessors-segment
        let fromUrl: URI_T = TypicodeRepository.POSTS_URL.segment(id.toString());
        return fetch(fromUrl.toString());
    }
}


