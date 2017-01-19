export var fetchedCast: string[] = [];
export var timeoutMs: number = 100;

function _fetchCast(ex) {
    setTimeout(function () {
        ex();
    }, timeoutMs);
}

export function loopArrayInDelayedCallback_quirked() {
    var namesOfCast = ["Marty", "Melman", "Alex"];
    fetchedCast = [];
    for (var i in namesOfCast) {
        _fetchCast(function () {
            fetchedCast.push(namesOfCast[i]);
        })
    }
}

export function loopArrayInDelayedCallback_fix_1_forIn() {
    var namesOfCast = ["Marty", "Melman", "Alex"];
    fetchedCast = [];
    for (let i in namesOfCast) { // use for...in for best only for objects
        _fetchCast(function () {
            i; // ?! if is this line is deleted, quirk behaviour is back !?
            fetchedCast.push(namesOfCast[i]);
        })
    }
}

export function loopArrayInDelayedCallback_fix_2_forOf() {
    var namesOfCast = ["Marty", "Melman", "Alex"];
    fetchedCast = [];
    for (let nameOfCast of namesOfCast) { // use for...of for arrays
        _fetchCast(function () {
            fetchedCast.push(nameOfCast);
        })
    }
}

export function loopArrayInDelayedCallback_fix_3_forEach() {
    var namesOfCast = ["Marty", "Melman", "Alex"];
    fetchedCast = [];
    namesOfCast.forEach(function (nameOfCast) {
        _fetchCast(function () {
            fetchedCast.push(nameOfCast);
        })
    });
}

export function loopArrayInDelayedCallback_fix_4_every() {
    var namesOfCast = ["Marty", "Melman", "Alex"];
    fetchedCast = [];
    namesOfCast.every(function (nameOfCast, index, namesOfCastArray) {
        _fetchCast(function () {
            fetchedCast.push(namesOfCastArray[index]); // could have used  nameOfCast interchangeably
        });
        return true; // #every requires to return
    });
}

export function loopArrayInDelayedCallback_fix_5_IFFE() {
    var namesOfCast = ["Marty", "Melman", "Alex"];
    fetchedCast = [];
    for (var i in namesOfCast) {
        (function IFFE(_i) { // a function expression delivers a new scope
            _fetchCast(function () {
                fetchedCast.push(namesOfCast[_i]);
            })
        })(i);
    }
}
