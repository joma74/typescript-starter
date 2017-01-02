import fetch, {Response} from "node-fetch";
import * as NodeURLAPI from "url";

export default class TypicodeRepository_old {
    public static POSTS_URL: NodeURLAPI.Url = NodeURLAPI.parse('http://jsonplaceholder.typicode.com/posts/');

    static fetchPost(id: number): Promise<Response> {
        let fromUrl = NodeURLAPI.resolve(TypicodeRepository_old.POSTS_URL.href, id.toString());
        return fetch(fromUrl.toString());

    }
}


