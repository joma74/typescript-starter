/**
 * import * as esrever from "esrever"; => error TS2307: Cannot find module 'esrever'.
 * See https://github.com/Microsoft/TypeScript/issues/2242#issuecomment-92218146 -> `import...` is disallowed for non-exporting JS libraries.
 */

let esrever = require("esrever");

export function numbersWithinEpsilon(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}

export function reverseStringNaive(reversable: string): string {
    return reversable.split('').reverse().join('');
}

export function reverseStringEsrever(reversable: string): string {
    return esrever.reverse(reversable);
}

export function getObject({
    c, d
}:{
    c: number, d: string
}): {
    a: number, b: string
} {
    let returnObject = {
        a: parseInt(esrever.reverse(""+c)),
        b: esrever.reverse(d)
    };
    return returnObject;
}
