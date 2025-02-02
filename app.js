const fs = require('fs');
const http = require('http');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const sayHello = require('./greetings');
const math = require('./math');
const lodash = require('lodash');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if(err){
        console.error(err);
        return;
    }
    console.log(data);
})

const content = 'Hello, NodeJs';

fs.writeFile('output.txt', content, (err) => {
    if(err){
        console.error(err);
        return;
    }
    console.log('File written successfully');
})


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World');
})

server.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
})


const directory = '/user/local';
const fileName = 'example.txt';

const fullPath = path.join(directory, fileName);

console.log(fullPath);


console.log('Platform: ', os.platform());
console.log('CPU Arch: ', os.arch());
console.log('Total Memory: ', os.totalmem());
console.log('Free Memory: ', os.freemem());


const myUrl = new URL('https://example.com:8080/path/name?query=hello#hash');
console.log('Host', myUrl.host);
console.log('Pathname', myUrl.pathname);
console.log('Search Params', myUrl.searchParams.get('query'));


const hash = crypto.createHash('sha256');
hash.update('Hello, World');

console.log(hash.digest('hex'));


const message = sayHello('Developers');
console.log(message);
console.log(math.add(5,3));
console.log(math.subtract(5,3));


const numbers = [1, 2, 3, 4, 5];
const reversed = lodash.reverse(numbers);

console.log(reversed);

// const readableStream = fs.createReadStream('example.txt', {encoding: 'utf8'});

// readableStream.on('data', (chunk) => {
//     console.log(chunk);
// })

// readableStream.on('end', () => {
//     console.log('Finished reading the file');
// })

// readableStream.on('error', (err) => {
//     console.error('Error', err);
// })


// const writableStream = fs.createWriteStream('output2.txt');

// writableStream.write('Hello, World!');
// writableStream.end();

// writableStream.on('finish', () => {
//     console.log('Finished writing to the file.');
// })


// const readableStream = fs.createReadStream('example.txt');
// const writableStream = fs.createWriteStream('example-output.txt');

readableStream.pipe(writableStream);

writableStream.on('finish', () => {
    console.log('File Copied Successfully.');
})


const readline = require('readline');
const readableStream = fs.createReadStream('example.txt');
const rl = readline.createInterface({input: readableStream});

rl.on('line', (line) => {
    console.log('Line: ', line);
})

rl.on('close', () => {
    console.log('Finished processing the file');
})


fs.mkdir('newDirectory', (err)=>{
    if(err)
        return console.error('Error creating directory: ', err);

    console.log('Directory created successfully');
})


fs.mkdirSync('newDirectory2');
console.log('Directory created successfully');


fs.readdir('./', (err, files) => {
    if(err)
        return console.error('Error reading directory: ', err);

    console.log('Directory content', files);
})


const files = fs.readdirSync('./');
console.log('Directory content', files);


const dirName = 'newDirectory3';

if(fs.existsSync(dirName))
    console.log('Directory already exists');
else
    console.log('Directory does not exist');


fs.rmdir('newDirectory2', (err) => {
    if(err)
        return console.error('Error removing directory: ', err);
    
    console.log('Directory removed successfully');
})


fs.rm('newDirectory2', {recursive: true}, (err) => {
    if(err)
        return console.error('Error removing directory: ', err);
    
    console.log('Directory removed successfully');
})


fs.rename('folder1', 'folder2', (err) => {
    if(err)
        return console.error('Error renaming directory: ', err);

    console.log('Directory renamed successfully!');
})


fs.stat('example.txt', (err, stats) => {
    if(err)
        return console.error(err);

    console.log('Directory stats: ', stats);
    console.log('Is directory: ', stats.isDirectory());
})


fs.watch('./', (eventType, filename) => {
    console.log(`Event: ${eventType}`);
    if(filename)
        console.log(`Filename: ${filename}`);
})

const EventEmitter = require('events');

const emitter = new EventEmitter();

// Registering a event listener
emitter.on('test1', () => {
    console.log('An event has occurred in test1');
})

emitter.on('error', (err) => {
    console.error('Error event: ', err.message);
})

try {
    emitter.emit('test1');
    emitter.removeListener('test1');
    emitter.emit('test1');
} catch (error) {
    emitter.emit('error', error);
}