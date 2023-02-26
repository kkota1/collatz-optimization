// command line:
// node collatz 1000000
// optional integer for the test limit, defaults to 1000000
const startTime = Date.now(),
    args = process.argv.slice(2),
    testLimit = args[0] ? parseInt(args[0]) : 1000000,
    loopStartTime = Date.now();

for (let initialN=1; initialN<testLimit; initialN+=2) {
    let lastN=initialN*1.5+.5, steps = 0;
    // if lastN < initialN, we already solved it. No need to continue. Otherwise...
    while (lastN > initialN) {
        if (lastN % 2) {
            lastN = lastN*1.5+.5;
        } else {
            lastN *= .5;
        }
        steps++
        if (steps>1024){
            console.log('hit step limit with initialN ' + initialN);
            break;
        }
    }
}

console.log(`time to brute force test up to ${testLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}: `, (Date.now() - loopStartTime) + 'ms');