import * as esrever from "esrever";

export function numbersWithinEpsilon(n1, n2) {
    return Math.abs( n1 - n2 ) < Number.EPSILON;
}


export function reverseStringNaive(reversable: string): string {
    return reversable.split('').reverse().join('');
}

export function reverseStringEsrevre(reversable: string): string {
    return esrever.reverse(reversable);
}

