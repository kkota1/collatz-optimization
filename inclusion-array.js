const startTime = Date.now(), lastModulus = 67108864, inclusions = [];

let {p8,p10,p12,p13,p15,p16,p18,p20,p21,p23,p24,p26} = require('./sets')


for (let i=3; i<lastModulus*3; i+=4) {
        if (i%3 &&
            i%16 !== 3
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
            && !p26.has(i%67108864)
        ) {
                inclusions.push(i);
        }
}
console.log(`time to generate inclusion array:`, (Date.now() - startTime) + 'ms');

const fs = require('fs');

fs.writeFile("./inclusions.txt", JSON.stringify(inclusions), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});