export var fetchedCast: string[] = [];
export var timeoutMs :number = 250;

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
            i;
            fetchedCast.push(namesOfCast[i]);
        })
    }
}

export function loopArrayInDelayedCallback_fixed() {
    var namesOfCast = ["Marty", "Melman", "Alex"];
    fetchedCast = [];
    for (let i in namesOfCast) { // with let a new i variable is created on each iteration
        _fetchCast(function () {
            i; // ?! if is this line is deleted, quirk behaviour is back !?
            fetchedCast.push(namesOfCast[i]);
        })
    }
}
