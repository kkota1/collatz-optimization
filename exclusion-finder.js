// command line:
// node exclusion-finder 1000000
// optional integer for the test limit, defaults to 100

const args = process.argv.slice(2),
    testLimit = args[0] ? parseInt(args[0]) : 100,
    sequenceMap = new Map(),
    repeaterSet = new Set(), repeaterArr = [];

let {p8,p10,p12,p13,p15,p16,p18,p20,p21,p23,p24,p26} = require('./sets')

let remainingCounter = 0;
for (let i=3; i<testLimit; i+=4) {
    if (i%16 !== 3
        && ![11,23].includes(i%32)
        && ![7,15,59].includes(i%128)
        && !p8.has(i%256)
        && !p10.has(i%1024)
        && !p12.has(i%4096)
        && !p13.has(i%8192)
        && !p15.has(i%32768)
        && !p16.has(i%65536)
        && !p18.has(i%262144)
        && !p20.has(i%1048576)
        && !p21.has(i%2097152)
        && !p23.has(i%8388608)
        && !p24.has(i%16777216)
    ) {
        remainingCounter++;
        mapPattern(i);
    }
}

function mapPattern(initialN){
    const arr = [];
    let lastN = initialN, m=1;
    // if lastN < initialN, we already solved it. No need to continue. Otherwise...
    while (lastN >= initialN) {
        if (lastN % 2) {
            arr.push('i');
            lastN = lastN*3 + 1;
            m*=3;
        } else {
            arr.push('d');
            lastN *= .5;
            m*=.5;
        }
    }
    const key = arr.join('') + ' ' + m;
    const oldVal = sequenceMap.get(key);
    const newVal = oldVal ? (oldVal.push(initialN) && oldVal) : [initialN];

    sequenceMap.set(key, newVal);
    if (newVal.length === 2 && !repeaterSet.has(key)) {
        repeaterSet.add(key);
        repeaterArr.push(newVal[0]);
    }
}
const fs = require('fs');
if (repeaterArr.length){
        fs.writeFile("./exclusion-tier.txt", JSON.stringify(repeaterArr), function(err) {
                if(err) {
                        return console.log(err);
                }
                console.log("The file was saved!");
        });
}

console.log(remainingCounter + ' inclusions in range');