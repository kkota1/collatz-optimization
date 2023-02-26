// command line:
// node collatz 1000000
// optional integer for the test limit, defaults to 1000000
const startTime = Date.now(),
    args = process.argv.slice(2),
    testLimit = args[0] ? parseInt(args[0]) : 1000000,
    lastModulus = 67108864;

const fs = require('fs');

fs.readFile('./inclusions.txt', 'utf8', (err, data) => {
    if (err) {console.error(err);return;}
    const inclusions = JSON.parse(data),
        loopStartTime = Date.now();

    console.log('saving time by only testing', (inclusions.length*100/(lastModulus*3)).toFixed(2) + '% of natural numbers');

    let initialN = 1;
    for (let i=0; i<testLimit; i+=lastModulus*3) {
        inclusions.forEach(j=>{
            initialN=i+j;
            let steps = 0, lastN=(initialN*9 + 5)>>2
            // if lastN < initialN, we already solved it. No need to continue. Otherwise...
            while (lastN > initialN) {
                switch (lastN&15) {
                    case 0:
                        lastN = lastN>>4;
                        break;
                    case 1:
                    case 5:
                    case 9:
                    case 13:
                        lastN = ((3*lastN)>>2)+1
                        break;
                    case 2:
                    case 6:
                    case 10:
                    case 14:
                        lastN = lastN>>1;
                        break;
                    case 3:
                        lastN = ((9*lastN)>>4)+1
                        break;
                    case 4:
                    case 12:
                        lastN = lastN>>2;
                        break;
                    case 7:
                    case 11:
                    case 15:
                        lastN = (lastN*9 + 5)>>2;
                        break;
                    case 8:
                        lastN = lastN>>3;
                        break;
                }
                steps++
                if (steps>1024){
                    console.log('hit step limit with initialN ' + initialN);
                    break;
                }
            }
        })
    }

    console.log(`time to brute force test up to ${initialN.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}: `, (Date.now() - loopStartTime) + 'ms');
});
