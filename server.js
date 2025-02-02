const http = require('http');
const url = require('url');


// Route Handler
const routes = {
    '/': (req, res) => {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end('Welcome to Homepage');
    },
    '/about': (req, res) => {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end('This is About Page');
    },
    '/notfound': (req, res) => {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('Page not found');
    }
}


const server1 = http.createServer((req, res) => {

    // 'GET' method
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end('Welcome to Homepage');
    } else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('Page not found');
    }

    // 'POST' method
    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', () => {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(({ message: 'Data received', data: body })));
        })

    } else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('Route not found');
    }

    // Handling the Query Parameters
    if (req.method === 'GET' && req.url.startsWith('/search')) {
        const queryObject = url.parse(req.url, true).query;

        res.writeHead(200, { "content-type": 'application/json', 'custom-header': 'custom-value', 'custom-tracking': '1234' });
        res.end(JSON.stringify({ message: 'Query received', queryObject }));
    } else {
        res.writeHead(404, { "content-type": 'text/plain' });
        res.end('Route not found');
    }
});


const server2 = http.createServer((req, res) => {

    const { pathname } = url.parse(req.url);

    if (routes[pathname])
        routes[pathname](req, res);
    else
        routes['/notfound'](req, res);
});


const server3 = http.createServer((req, res) => {

    const { pathname } = url.parse(req.url);

    if (pathname.startsWith('/user/')) {
        const userId = pathname.split('/')[2];
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(`User ID: ${userId}`);
    } else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('Route not found');
    }
});


// Middleware function for logging requests
function logRequest(req, res, next) {
    console.log(`${req.method} request made to ${req.url}`);
    next(req, res);
}


const server4 = http.createServer((req, res) => {
    logRequest(req, res, (req, res) => {

        const { pathname } = url.parse(req.url);

        if (pathname.startsWith('/user/')) {
            const userId = pathname.split('/')[2];
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end(`User ID: ${userId}`);
        } else {
            res.writeHead(404, { 'content-type': 'text/plain' });
            res.end('Route not found');
        }
    })
});


const PORT1 = 3001;
const PORT2 = 3002;
const PORT3 = 3003;
const PORT4 = 3004;

server1.listen(PORT1, () => {
    console.log(`Server is runing on http://localhost:${PORT1}`);
})

server2.listen(PORT2, () => {
    console.log(`Server is runing on http://localhost:${PORT2}`);
})

server3.listen(PORT3, () => {
    console.log(`Server is runing on http://localhost:${PORT3}`);
})

server4.listen(PORT4, () => {
    console.log(`Server is runing on http://localhost:${PORT4}`);
})