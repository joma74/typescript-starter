import fetch from "node-fetch";
import {Response} from "node-fetch";

export default class TypicodeRepository {
    public static POSTS_URL: string = 'http://jsonplaceholder.typicode.com/posts/';

    static fetchPost(id: number): Promise<Response> {
        let fromUrl = TypicodeRepository.POSTS_URL + id;
        return fetch(fromUrl, true);
    }
}


