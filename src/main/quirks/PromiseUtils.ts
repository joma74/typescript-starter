export default class PromiseUtils {

    public static ISRESOLVED: string = "ISRESOLVED";
    public static ISREJECTED: string = "ISREJECTED";

    /**
     *
     * @param somePromise a
     * @returns a Promise which is thened to an object having {r} for result and {s} for status
     */
    public static reflect(somePromise: Promise<any>): Promise<any> {
        return somePromise.then(
            function (r) {
                return {r: r, s: PromiseUtils.ISRESOLVED}
            },
            function (r) {
                return {r: r, s: PromiseUtils.ISREJECTED};
            });
    };
}