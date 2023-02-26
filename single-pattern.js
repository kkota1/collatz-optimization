const args = process.argv.slice(2),
    initialN = args[0] ? parseInt(args[0]) : 27;

const arr = [];
let a=1,b=0;
let lastN = initialN;
let steps = 0;
let patternFound = false;
while (lastN > 2) {
    if (lastN % 2) {
        arr.push('i');
        lastN = lastN*3 + 1;
        a*=3;
        b+=1;
    } else {
        arr.push('d');
        lastN *= .5;
        a*=.5;
        b*=.5
    }
    if (lastN < initialN && !patternFound) {
        console.log(arr.join(''));
        console.log(a, b);
        console.log(lastN);
        patternFound = true;
    }
    steps++;
}

console.log(steps + ' total steps to 4-2-1');