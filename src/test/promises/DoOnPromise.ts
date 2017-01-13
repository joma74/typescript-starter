export default class OnPromise {

    public static messagesSth: string [] = ['doSomething(start)', 'doSomething(end)'];

    public static messagesSthOther: string [] = ['doSomethingOther(start)', 'doSomethingOther(end)'];

    public static messagesFinal: string [] = ['doFinal(start)', 'doFinal(end)'];

     public static resultOfResolvement: number = 42;

    public static letsDo(messagesExpectd: string [], messagesACTUAL: string [], resultOfResolvement: number): Promise<any> {
        messagesACTUAL.push(messagesExpectd[0]);
        console.log("Result of previous resolvement >>" + resultOfResolvement + "<<")
        return new Promise(function (resolve) {
            setTimeout(function () {
                messagesACTUAL.push(messagesExpectd[1]);
                resolve(OnPromise.resultOfResolvement);
            }, 300);
        });
    };

    public static letsDoSth = function (messagesACTUAL: string []) {
        return (resultOfResolvement) => OnPromise.letsDo(OnPromise.messagesSth, messagesACTUAL, resultOfResolvement);
    };

    public static letsDoSthOther = function (messagesACTUAL: string []) {
        return (resultOfResolvement) => OnPromise.letsDo(OnPromise.messagesSthOther, messagesACTUAL, resultOfResolvement);
    };

    public static letsDoFinal = function (messagesACTUAL: string []) {
        return (resultOfResolvement) => OnPromise.letsDo(OnPromise.messagesFinal, messagesACTUAL, resultOfResolvement);
    };
}