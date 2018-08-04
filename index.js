const { parse, stringify, resync, } = require('subtitle');
var fs = require('fs');
var path = require('path');
var program = require('commander');

program
  .version('0.0.1')
  .description('An application resyncing subtitles')
  .option('-s, --subs <srtfile>', 'subtitle file to process')
  .option('-f, --file <file>', 'file to write new subs to')
  .option('-o, --offset <integer>', 'time (in ms) to offset subtitles')
  .parse(process.argv);

  console.log(program.args);
  console.log(program.offset);
  console.log(program.file);
  console.log(program.subs);

var subs = "";

try {  
    subs = fs.readFileSync(program.subs, 'utf8');  
} catch(e) {
    console.log('Error reading subtitles:', e.stack);
}

const oldSubtitles = parse(subs);

const newSubtitles = resync(oldSubtitles, program.offset);

console.log(oldSubtitles[0]);
console.log(newSubtitles[0]);

const newString = stringify(newSubtitles);

const newSubsPath = program.file ? path.resolve(program.file) : path.resolve(`./resyncedSubs.srt`);

fs.writeFile(newSubsPath, newString, function(err) {
    if(err) {
        return console.log(err);
    }
});
