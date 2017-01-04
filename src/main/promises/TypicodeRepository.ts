import fetch from "node-fetch";
// module <code>urijs</code> uses namespaces. <code>uri.URIStatic</code> is just the interface type prescribing new()
// and static methods
import URI_T = uri.URI;
import {TypicodeURL} from "main/promises/TypicodeURL";

export default class TypicodeRepository {

    static getPostUrlTo(id: number): URI_T {
        // http://medialize.github.io/URI.js/docs.html#accessors-segment
        return TypicodeURL.ofPosts.clone().segment(id.toString()); // Yikes, segment does alter POSTS_URL
    }
    static getPostUrlStringTo(id: number): string {
        return TypicodeRepository.getPostUrlTo(id).toString();
    }

    static fetchPost(id: number) {
        let fromUrlString: string = TypicodeRepository.getPostUrlStringTo(id)
        return fetch(fromUrlString);
    }
}


