/**
 Example of node as a basic "static" server created with node.js and
 only its internal modules: http, url, and fs.

 Here our node server does not try to analyse the url to route the requests,
 it simply servers whatever files that happen to be in the ROOT_DIR directory.
 It does however replace a path of '/' with '/index.html'.

 Because it is a static server it does not analyse the requested URL.
 It simply serves such a file if it exists in the intended directory.

 Unlike our previous Too Simple Server this one uses the file extension
 of the requested resoure to decide on the appropriate MIME
 type to return to the client.
 */

// Ctrl+C to stop server

const http = require('http'); //need to http
const fs   = require('fs'); //need to read static files
const url  = require('url');  //to parse url strings

const ROOT_DIR = 'html'; //dir to serve static files from

http.createServer(function(request, response) {
    const urlObj = url.parse(request.url, true, false);

    console.log('\n============================');
    console.log("PATHNAME: " + urlObj.pathname);
    console.log("METHOD: " + request.method);

    let filePath = ROOT_DIR + urlObj.pathname;

    if(urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html';

    fs.readFile(filePath, function(err, data) {
        if(err) {
            //report error to console
            console.log('ERROR: ' + JSON.stringify(err));
            //respond with not found 404 to client
            response.writeHead(404);
            response.end();
            return;
        }
        response.writeHead(200);
        response.end(data);
    });

})
    .listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');