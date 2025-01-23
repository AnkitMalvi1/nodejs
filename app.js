const fs = require('fs');
const http = require('http');

// fs.readFile('example.txt', 'utf8', (err, data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })

// const content = 'Hello, NodeJs';

// fs.writeFile('output.txt', content, (err) => {
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log('File written successfully');
// })


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    
})