const Subtitle = require('subtitle');
const { parse, stringify, stringifyVtt, resync, toMS, toSrtTime, toVttTime } = require('subtitle');
var fs = require('fs');
var subs = "";

try {  
    var subs = fs.readFileSync(process.argv[2], 'utf8');
    console.log(subs);    
} catch(e) {
    console.log('Error:', e.stack);
}

const oldSubtitles = parse(subs);

const newSubtitles = resync(oldSubtitles, 4800);

console.log(oldSubtitles[0]);
console.log(newSubtitles[0]);

const newString = stringify(newSubtitles);

fs.writeFile("./mysub.srt", newString, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 