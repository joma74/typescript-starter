export default class OnPromise {

    public static messagesSth: string [] = ['doSomething(start)', 'doSomething(end)'];

    public static messagesSthOther: string [] = ['doSomethingOther(start)', 'doSomethingOther(end)'];

    public static messagesFinal: string [] = ['doFinal(start)', 'doFinal(end)'];

    public static resultOfResolvement: number = 42;

    public static letsDo(messagesOnStartOnEnd: string [], messagesACTUAL: string [], resultOfResolvement: number): Promise<any> {
        messagesACTUAL.push(messagesOnStartOnEnd[0]);
        return new Promise(function (resolve) {
            setTimeout(function () {
                messagesACTUAL.push(messagesOnStartOnEnd[1]);
                resolve(OnPromise.resultOfResolvement);
            }, 350);
        });
    };

    /**
     * Function holder holding a message array which will be filled by event messages from
     * {@link OnPromise.messagesSth}. To execute the inner function {@link OnPromise.letsDo} call () with some value e.g. a
     * result from a previous promise resolvement, else undefined.
     *
     * @param messagesACTUAL to be filled with messages from events e.g. on start, on end
     * @returns {(resultOfResolvement:any)=>Promise<any>} the promise from {@link OnPromise.letsDo}.
     */
    public static letsDoSth = function (messagesACTUAL: string []) {
        return (resultOfResolvement) => OnPromise.letsDo(OnPromise.messagesSth, messagesACTUAL, resultOfResolvement);
    };

    /**
     * Function holder holding a message array which will be filled by event messages from
     * {@link OnPromise.messagesSthOther}. To execute the inner function {@link OnPromise.letsDo} call () with some value e.g. a
     * result from a previous promise resolvement, else undefined.
     *
     * @param messagesACTUAL to be filled with messages from events e.g. on start, on end
     * @returns {(resultOfResolvement:any)=>Promise<any>} the promise from {@link OnPromise.letsDo}.
     */
    public static letsDoSthOther = function (messagesACTUAL: string []) {
        return (resultOfResolvement) => OnPromise.letsDo(OnPromise.messagesSthOther, messagesACTUAL, resultOfResolvement);
    };

    /**
     * Function holder holding a message array which will be filled by event messages from
     * {@link OnPromise.messagesFinal}. To execute the inner function {@link OnPromise.letsDo} call () with some value e.g. a
     * result from a previous promise resolvement, else undefined.
     *
     * @param messagesACTUAL to be filled with messages from events e.g. on start, on end
     * @returns {(resultOfResolvement:any)=>Promise<any>} the promise from {@link OnPromise.letsDo}.
     */
    public static letsDoFinal = function (messagesACTUAL: string []) {
        return (resultOfResolvement) => OnPromise.letsDo(OnPromise.messagesFinal, messagesACTUAL, resultOfResolvement);
    };
}